"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Moon, Sun, Shield, ShieldOff, Info } from "lucide-react";

export default function SettingsTab() {
  const { isDarkMode, toggleDarkMode, isSafetyMode, toggleSafetyMode } = useApp();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Settings & Modes</h2>
        <p className="text-xs text-white/40">Customize your Bizimana AI experience</p>
      </div>

      <div className="space-y-3 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#003478]/30 flex items-center justify-center">
                {isDarkMode ? <Moon size={20} className="text-[#e6c310]" /> : <Sun size={20} className="text-[#e6c310]" />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Theme</h3>
                <p className="text-xs text-white/40">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? "bg-[#003478]" : "bg-white/20"
              }`}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ x: isDarkMode ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00a651]/30 flex items-center justify-center">
                {isSafetyMode ? <Shield size={20} className="text-[#00a651]" /> : <ShieldOff size={20} className="text-white/50" />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Safety-First Mode</h3>
                <p className="text-xs text-white/40">
                  {isSafetyMode ? "Constitutional safety enabled" : "Standard mode"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleSafetyMode}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                isSafetyMode ? "bg-[#00a651]" : "bg-white/20"
              }`}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ x: isSafetyMode ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          {isSafetyMode && (
            <p className="text-xs text-[#00a651]/70 ml-[52px]">
              Responses are filtered through constitutional safety principles
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6c310]/20 flex items-center justify-center">
              <Info size={20} className="text-[#e6c310]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">About Bizimana AI</h3>
            </div>
          </div>
          <p className="text-xs text-white/50 leading-relaxed ml-[52px]">
            Bizimana AI is a powerful, friendly, and professional AI assistant designed to help users in Rwanda and around the world. 
            Features include general chat, summarization, image generation, deep research, project planning, and live translation.
          </p>
          <div className="mt-3 ml-[52px] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#003478]" />
            <div className="w-2 h-2 rounded-full bg-[#e6c310]" />
            <div className="w-2 h-2 rounded-full bg-[#00a651]" />
            <span className="text-[10px] text-white/30 ml-1">Rwanda-inspired design</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
