"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, PASSCODE } from "@/context/AppContext";
import { Sparkles, Lock, Shield, Eye, EyeOff } from "lucide-react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setAuthenticated } = useApp();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === PASSCODE) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code. Please try again.");
      setPasscode("");
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#003478]/60 via-black/80 to-[#00a651]/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl rwanda-gradient flex items-center justify-center shadow-lg shadow-[#003478]/30"
          >
            <Shield size={36} className="text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold mb-1">
              <span className="text-[#e6c310]">Bizimana</span>{" "}
              <span className="text-white">AI</span>
            </h1>
            <p className="text-sm text-white/50 mb-6">Secure Access Required</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                placeholder="Enter access code"
                className="message-input pl-10 pr-10 text-center text-lg tracking-widest"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
              >
                {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!passcode.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 cursor-pointer"
            >
              <Sparkles size={18} />
              Access Bizimana AI
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-[10px] text-white/20"
          >
            Protected by advanced security protocols
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
