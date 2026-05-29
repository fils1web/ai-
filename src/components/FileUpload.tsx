"use client";

import { useState, useRef, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Upload, File, X, Search, Loader2 } from "lucide-react";

export default function FileUpload() {
  const { uploadedFile, setUploadedFile, isProcessing, setIsProcessing } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setAnalysis(null);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch {
      setAnalysis("Analysis failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-[#e6c310] bg-[#e6c310]/5"
            : uploadedFile
              ? "border-[#00a651]/40 bg-[#00a651]/5"
              : "border-white/10 hover:border-white/30 bg-white/3"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.csv,.json"
        />

        <AnimatePresence mode="wait">
          {uploadedFile ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File size={20} className="text-[#00a651] shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-white/50">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  disabled={isProcessing}
                  className="btn-primary flex items-center gap-2 text-sm py-2 px-4 cursor-pointer"
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Search size={16} />
                  )}
                  {isProcessing ? "Analyzing..." : "Analyze with Agent"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    setAnalysis(null);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={16} className="text-white/50 hover:text-white" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <Upload size={24} className="text-white/40" />
              <p className="text-sm text-white/60">
                <span className="text-[#e6c310]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/30">
                PDF, DOC, TXT, PNG, JPG, CSV, JSON
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4 p-4 rounded-xl glass"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[#e6c310]">Analysis Result</h3>
              <button
                onClick={() => setAnalysis(null)}
                className="text-white/40 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{analysis}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
