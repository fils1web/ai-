"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { generateImage } from "@/lib/api";
import RwandaSpinner from "./RwandaSpinner";
import { Image, Sparkles } from "lucide-react";

export default function ImageGenerationTab() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [enhancedPrompts, setEnhancedPrompts] = useState<string[]>([]);
  const { isProcessing, setIsProcessing } = useApp();

  const handleGenerate = async () => {
    if (!prompt.trim() || isProcessing) return;
    setIsProcessing(true);
    try {
      const prompts = await generateImage(prompt);
      setEnhancedPrompts(prompts);
      setImages(prompts.map((p, i) => `https://placehold.co/400x400/003478/FFFFFF?text=Image+${i + 1}`));
    } catch {
      setEnhancedPrompts([]);
      setImages([]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Image Generation</h2>
        <p className="text-xs text-white/40">Create stunning images with AI</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="message-input flex-1"
          disabled={isProcessing}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isProcessing}
          className="btn-primary flex items-center gap-2 px-5 cursor-pointer"
        >
          <Sparkles size={16} />
          Generate
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isProcessing && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RwandaSpinner size={48} />
              <p className="text-white/40 text-sm mt-4">Crafting your images...</p>
              <p className="text-white/20 text-xs mt-1">Enhancing prompt and generating variations</p>
            </div>
          </div>
        )}

        {!isProcessing && images.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full rwanda-gradient flex items-center justify-center">
                <Image size={24} className="text-white" />
              </div>
              <p className="text-white/40 text-sm">Describe what you want to see</p>
              <p className="text-white/20 text-xs mt-1">I'll generate multiple variations for you</p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {images.length > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {images.map((url, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className="aspect-square bg-[#003478]/20 flex items-center justify-center overflow-hidden">
                    <img
                      src={url}
                      alt={`Generated ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {enhancedPrompts[i] && (
                    <div className="p-3">
                      <p className="text-xs text-white/50 line-clamp-2">{enhancedPrompts[i]}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
