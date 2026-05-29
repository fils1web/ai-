"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translateText } from "@/lib/api";
import RwandaSpinner from "./RwandaSpinner";
import { Globe, ArrowRightLeft } from "lucide-react";

const languages = [
  "Advanced English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Russian",
  "Arabic",
  "Chinese (Simplified)",
  "Japanese",
  "Korean",
  "Swahili",
  "Kinyarwanda",
  "Lingala",
  "Zulu",
  "Yoruba",
  "Hausa",
  "Amharic",
  "Hindi",
  "Bengali",
  "Turkish",
  "Vietnamese",
  "Thai",
];

export default function LiveTranslatorTab() {
  const [sourceText, setSourceText] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("Advanced English");
  const { isProcessing, setIsProcessing } = useApp();

  const handleTranslate = async () => {
    if (!sourceText.trim() || isProcessing) return;
    setIsProcessing(true);
    setTranslated("");
    try {
      const result = await translateText(sourceText, targetLang);
      setTranslated(result);
    } catch {
      setTranslated("Translation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Live Translator</h2>
        <p className="text-xs text-white/40">Translate between 100+ languages</p>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <label className="text-xs text-white/40 block mb-1">From</label>
          <input
            value="Auto-Detect"
            disabled
            className="message-input text-white/50 cursor-not-allowed"
          />
        </div>
        <ArrowRightLeft size={16} className="text-[#e6c310] mt-5" />
        <div className="flex-1">
          <label className="text-xs text-white/40 block mb-1">To</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="message-input cursor-pointer appearance-none"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="flex-1 flex flex-col">
          <label className="text-xs text-white/40 mb-1">Source Text</label>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="message-input flex-1 resize-none min-h-[100px]"
            disabled={isProcessing}
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isProcessing}
          className="btn-primary flex items-center justify-center gap-2 py-3 cursor-pointer"
        >
          {isProcessing ? (
            <RwandaSpinner size={18} />
          ) : (
            <Globe size={16} />
          )}
          {isProcessing ? "Translating..." : "Translate"}
        </button>

        <div className="flex-1 flex flex-col">
          <label className="text-xs text-white/40 mb-1">Translation</label>
          <div className="message-input flex-1 min-h-[100px] overflow-y-auto whitespace-pre-wrap">
            {translated || (
              <span className="text-white/30">Translation will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
