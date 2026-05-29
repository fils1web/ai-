"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import type { FloatingAction, TabId } from "@/types";
import {
  Search,
  Code,
  Languages,
  Eye,
  FileText,
  Lightbulb,
  AlignLeft,
  X,
} from "lucide-react";

const actions: { id: FloatingAction; label: string; icon: React.ReactNode; tab: TabId }[] = [
  { id: "research", label: "Deep Research", icon: <Search size={18} />, tab: "research" },
  { id: "coding", label: "Coding Engineer", icon: <Code size={18} />, tab: "chat" },
  { id: "translation", label: "Translation", icon: <Languages size={18} />, tab: "translator" },
  { id: "vision", label: "Vision Analysis", icon: <Eye size={18} />, tab: "chat" },
  { id: "documents", label: "Document Intelligence", icon: <FileText size={18} />, tab: "summary" },
  { id: "strategy", label: "Strategy", icon: <Lightbulb size={18} />, tab: "pro" },
  { id: "summarize", label: "Summarize", icon: <AlignLeft size={18} />, tab: "summary" },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveTab, setActiveFloatingAction } = useApp();

  const handleAction = (action: (typeof actions)[0]) => {
    setActiveFloatingAction(action.id);
    setActiveTab(action.tab);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 mb-2"
          >
            {actions.map((action, i) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => handleAction(action)}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl glass hover:border-[#e6c310]/40 transition-all duration-200 text-white/80 hover:text-white cursor-pointer"
              >
                <span className="text-[#e6c310]">{action.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full rwanda-gradient flex items-center justify-center shadow-lg shadow-[#003478]/30 cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <Lightbulb size={24} />}
      </motion.button>
    </div>
  );
}
