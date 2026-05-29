"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { conductResearch } from "@/lib/api";
import type { ResearchResult } from "@/types";
import RwandaSpinner from "./RwandaSpinner";
import { Search, BookOpen, ExternalLink } from "lucide-react";

export default function DeepResearchTab() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const { isProcessing, setIsProcessing } = useApp();

  const handleResearch = async () => {
    if (!query.trim() || isProcessing) return;
    setIsProcessing(true);
    setResult(null);
    try {
      const res = await conductResearch(query);
      setResult(res);
    } catch {
      setResult({
        query,
        findings: ["Research failed. Please try again."],
        citations: [],
        summary: "An error occurred during research.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Deep Research</h2>
        <p className="text-xs text-white/40">Iterative research with citations and findings</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a research topic..."
          className="message-input flex-1"
          disabled={isProcessing}
          onKeyDown={(e) => e.key === "Enter" && handleResearch()}
        />
        <button
          onClick={handleResearch}
          disabled={!query.trim() || isProcessing}
          className="btn-primary flex items-center gap-2 px-5 cursor-pointer"
        >
          <Search size={16} />
          Research
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
        {isProcessing && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RwandaSpinner size={48} />
              <p className="text-white/40 text-sm mt-4">Conducting deep research...</p>
              <p className="text-white/20 text-xs mt-1">Gathering findings and citations</p>
            </div>
          </div>
        )}

        {!isProcessing && !result && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full rwanda-gradient flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <p className="text-white/40 text-sm">What would you like to research?</p>
              <p className="text-white/20 text-xs mt-1">I'll provide findings with citations</p>
            </div>
          </div>
        )}

        {result && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-[#e6c310] mb-2">Summary</h3>
              <p className="text-sm text-white/80 leading-relaxed">{result.summary}</p>
            </div>

            {result.findings.length > 0 && (
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-[#e6c310] mb-3">Key Findings</h3>
                <ul className="space-y-2">
                  {result.findings.map((finding, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/70">
                      <span className="text-[#00a651] mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.citations.length > 0 && (
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-[#e6c310] mb-3 flex items-center gap-2">
                  <ExternalLink size={14} />
                  Citations
                </h3>
                <ul className="space-y-1">
                  {result.citations.map((citation, i) => (
                    <li key={i} className="text-xs text-white/50">[{i + 1}] {citation}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
