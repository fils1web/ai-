"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, PASSCODE } from "@/context/AppContext";
import { Lock, Unlock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AuthGate() {
  const { isAuthenticated, setAuthenticated } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === PASSCODE) {
      setAuthenticated(true);
      setPasscode("");
      setError("");
      setShowModal(false);
    } else {
      setError("Invalid code");
      setPasscode("");
    }
  };

  const handleLockClick = () => {
    if (isAuthenticated) {
      setAuthenticated(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleLockClick}
        title={isAuthenticated ? "Lock app" : "Unlock app"}
        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
      >
        {isAuthenticated ? (
          <Unlock size={14} className="text-[#00a651]" />
        ) : (
          <Lock size={14} className="text-white/40 hover:text-white" />
        )}
        <span className={`text-[10px] font-medium ${isAuthenticated ? "text-[#00a651]" : "text-white/30"}`}>
          {isAuthenticated ? "Unlocked" : "Locked"}
        </span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowModal(false); setError(""); setPasscode(""); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-80"
            >
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl rwanda-gradient flex items-center justify-center shadow-lg shadow-[#003478]/30">
                  <ShieldCheck size={24} className="text-white" />
                </div>

                <h2 className="text-base font-semibold text-white mb-1">Access Code Required</h2>
                <p className="text-xs text-white/40 mb-5">Enter the passcode to unlock</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPasscode ? "text" : "password"}
                      value={passcode}
                      onChange={(e) => { setPasscode(e.target.value); setError(""); }}
                      placeholder="Enter passcode"
                      className="message-input text-center text-base tracking-widest pr-10"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
                    >
                      {showPasscode ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); setError(""); setPasscode(""); }}
                      className="flex-1 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!passcode.trim()}
                      className="flex-1 py-2 rounded-lg btn-primary text-xs cursor-pointer"
                    >
                      Unlock
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
