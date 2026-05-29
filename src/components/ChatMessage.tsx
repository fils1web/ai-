"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Message } from "@/types";
import { formatTime } from "@/lib/utils";
import { Copy, Download, Share2, ChevronDown, ChevronUp, User, Sparkles } from "lucide-react";

export default function ChatMessage({ message }: { message: Message }) {
  const [expanded, setExpanded] = useState(false);
  const isUser = message.role === "user";
  const isLong = message.content.length > 300;

  const displayContent = isLong && !expanded ? message.content.slice(0, 200) + "..." : message.content;

  const handleCopy = () => navigator.clipboard.writeText(message.content);
  const handleDownload = () => {
    const blob = new Blob([message.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `bizimana-response-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: message.content });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-[#003478]" : "bg-gradient-to-br from-[#e6c310] to-[#00a651]"
        }`}
      >
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>

      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser ? "bg-[#003478]/80 rounded-tr-md" : "glass-card rounded-tl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayContent}</p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 flex items-center gap-1 text-xs text-[#e6c310] hover:text-[#e6c310]/80 cursor-pointer"
            >
              {expanded ? (
                <>Show Less <ChevronUp size={12} /></>
              ) : (
                <>Show More <ChevronDown size={12} /></>
              )}
            </button>
          )}
        </div>

        <div className={`flex items-center gap-2 mt-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-white/30">{formatTime(message.timestamp)}</span>
          {!isUser && (
            <div className="flex items-center gap-1">
              <button onClick={handleCopy} className="p-1 hover:bg-white/5 rounded transition-colors cursor-pointer" title="Copy">
                <Copy size={10} className="text-white/30 hover:text-white/60" />
              </button>
              <button onClick={handleDownload} className="p-1 hover:bg-white/5 rounded transition-colors cursor-pointer" title="Download">
                <Download size={10} className="text-white/30 hover:text-white/60" />
              </button>
              <button onClick={handleShare} className="p-1 hover:bg-white/5 rounded transition-colors cursor-pointer" title="Share">
                <Share2 size={10} className="text-white/30 hover:text-white/60" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
