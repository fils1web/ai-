"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { createMessage } from "@/lib/utils";
import { generateSummary } from "@/lib/api";
import ChatMessage from "./ChatMessage";
import FileUpload from "./FileUpload";
import RwandaSpinner from "./RwandaSpinner";
import { FileText, Zap } from "lucide-react";

export default function SummaryTab() {
  const { messages, addMessage, isProcessing, setIsProcessing, uploadedFile } = useApp();
  const [input, setInput] = useState("");

  const handleSummarize = async () => {
    if ((!input.trim() && !uploadedFile) || isProcessing) return;
    const text = input.trim() || `[Analyze the uploaded file: ${uploadedFile?.name}]`;
    const userMsg = createMessage("user", `Please summarize: ${text}`);
    addMessage("summary", userMsg);
    setInput("");
    setIsProcessing(true);

    try {
      const content = await generateSummary(text);
      addMessage("summary", createMessage("assistant", content));
    } catch {
      addMessage("summary", createMessage("assistant", "I encountered an error while generating the summary. Please try again."));
    } finally {
      setIsProcessing(false);
    }
  };

  const summaryMessages = messages.summary;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Expert Summarizer</h2>
        <p className="text-xs text-white/40">Transform long content into clear, structured summaries</p>
      </div>

      <FileUpload />

      <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
        {summaryMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full rwanda-gradient flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <p className="text-white/40 text-sm">Paste text or upload a document to summarize</p>
              <p className="text-white/20 text-xs mt-1">Get key insights in seconds</p>
            </div>
          </div>
        ) : (
          summaryMessages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        {isProcessing && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6c310] to-[#00a651] flex items-center justify-center">
              <RwandaSpinner size={16} />
            </div>
            <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3">
              <RwandaSpinner size={20} />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text to summarize, or upload a file above..."
          className="message-input flex-1 resize-none"
          rows={2}
          disabled={isProcessing}
        />
        <button
          onClick={handleSummarize}
          disabled={(!input.trim() && !uploadedFile) || isProcessing}
          className="btn-primary flex items-center justify-center w-12 h-12 p-0 cursor-pointer"
        >
          <Zap size={18} />
        </button>
      </div>
    </div>
  );
}
