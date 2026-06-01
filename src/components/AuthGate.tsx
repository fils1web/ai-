"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, AUTH_EMAIL, AUTH_PASSWORD } from "@/context/AppContext";
import { Lock, Unlock, Eye, EyeOff, ShieldCheck, Mail } from "lucide-react";

export default function AuthGate() {
  const { isAuthenticated, setAuthenticated } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === AUTH_EMAIL && password === AUTH_PASSWORD) {
      setAuthenticated(true);
      setEmail("");
      setPassword("");
      setError("");
      setShowModal(false);
    } else {
      setError("Invalid email or password");
      setPassword("");
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
            onClick={() => { setShowModal(false); setError(""); setEmail(""); setPassword(""); }}
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

                <h2 className="text-base font-semibold text-white mb-1">Sign In</h2>
                <p className="text-xs text-white/40 mb-5">Enter your credentials to unlock</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="Email"
                      className="message-input text-sm pl-9"
                      autoFocus
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Password"
                      className="message-input text-center text-base tracking-widest pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
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
                      onClick={() => { setShowModal(false); setError(""); setEmail(""); setPassword(""); }}
                      className="flex-1 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!email.trim() || !password.trim()}
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
