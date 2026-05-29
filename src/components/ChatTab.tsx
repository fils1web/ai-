"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { createMessage } from "@/lib/utils";
import { generateChatResponse, generateVisionResponse } from "@/lib/api";
import ChatMessage from "./ChatMessage";
import RwandaSpinner from "./RwandaSpinner";
import FileUpload from "./FileUpload";
import { Send, Trash2, Code, Eye } from "lucide-react";

const modeDescriptions: Record<string, { title: string; desc: string; icon: React.ReactNode }> = {
  general: { title: "General Chat", desc: "Ask me anything", icon: null },
  coding: {
    title: "Coding Engineer",
    desc: "Write, debug, and optimize code",
    icon: <Code size={16} className="text-[#00a651]" />,
  },
  vision: {
    title: "Vision Analysis",
    desc: "Analyze images and visual content",
    icon: <Eye size={16} className="text-[#e6c310]" />,
  },
};

export default function ChatTab() {
  const {
    messages,
    addMessage,
    clearMessages,
    isProcessing,
    setIsProcessing,
    uploadedFile,
    activeMode,
    setActiveMode,
  } = useApp();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const modeInfo = modeDescriptions[activeMode] || modeDescriptions.general;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeMode === "general" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeMode]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userMsg = createMessage("user", input);
    addMessage("chat", userMsg);
    setInput("");
    setIsProcessing(true);

    try {
      let fileContext = "";
      if (uploadedFile) {
        fileContext = `[File attached: ${uploadedFile.name}]`;
      }
      const content =
        activeMode === "vision"
          ? await generateVisionResponse(
              [...messages.chat, userMsg].map((m) => ({ role: m.role, content: m.content })),
              fileContext
            )
          : await generateChatResponse(
              [...messages.chat, userMsg].map((m) => ({ role: m.role, content: m.content })),
              fileContext,
              activeMode
            );
      addMessage("chat", createMessage("assistant", content));
    } catch {
      addMessage(
        "chat",
        createMessage(
          "assistant",
          "I apologize, but I encountered an error. Please try again."
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetMode = () => {
    setActiveMode("general");
  };

  const chatMessages = messages.chat;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">{modeInfo.title}</h2>
              {modeInfo.icon}
            </div>
            <p className="text-xs text-white/40">{modeInfo.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeMode !== "general" && (
            <button
              onClick={handleResetMode}
              className="text-[10px] px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              ← General Mode
            </button>
          )}
          {chatMessages.length > 0 && (
            <button
              onClick={() => clearMessages("chat")}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      <FileUpload />

      <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
        {chatMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full rwanda-gradient flex items-center justify-center">
                <SparklesIcon />
              </div>
              <p className="text-white/40 text-sm">Start a conversation with Bizimana AI</p>
              <p className="text-white/20 text-xs mt-1">
                {activeMode === "coding"
                  ? "Describe the code you need help with"
                  : activeMode === "vision"
                    ? "Upload an image for analysis"
                    : "Your intelligent assistant for Rwanda and the world"}
              </p>
            </div>
          </div>
        ) : (
          chatMessages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
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
        <div ref={endRef} />
      </div>

      <div className="flex gap-2 pt-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            activeMode === "coding"
              ? "Describe the code, algorithm, or bug..."
              : activeMode === "vision"
                ? "Ask about an image or describe what you're looking for..."
                : "Type your message..."
          }
          className="message-input flex-1"
          disabled={isProcessing}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isProcessing}
          className="btn-primary flex items-center justify-center w-12 h-12 p-0 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M18 14l-1 2.5L21 18l-2.5 1L18 21l-1-2.5L14 18l2.5-1z" />
      <path d="M6 14l-1 2.5L3 18l2.5 1L6 21l1-2.5L10 18l-2.5-1z" />
    </svg>
  );
}
