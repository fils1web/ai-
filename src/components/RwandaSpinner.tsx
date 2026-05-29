"use client";

import { motion } from "framer-motion";

export default function RwandaSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#e6c310]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-transparent border-r-[#00a651]"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#003478]"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          background: "linear-gradient(135deg, #e6c310, #00a651)",
        }}
      />
    </div>
  );
}
