"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { generateProjectPlan } from "@/lib/api";
import type { ProjectPlan } from "@/types";
import RwandaSpinner from "./RwandaSpinner";
import { Rocket, Lightbulb, Clock, Users } from "lucide-react";

export default function AssistantToProTab() {
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState<ProjectPlan | null>(null);
  const { isProcessing, setIsProcessing } = useApp();

  const handleGenerate = async () => {
    if (!topic.trim() || isProcessing) return;
    setIsProcessing(true);
    setPlan(null);
    try {
      const p = await generateProjectPlan(topic);
      setPlan(p);
    } catch {
      setPlan({
        pillars: [{ title: "Error", description: "Failed to generate plan", steps: ["Try again"] }],
        timeline: "N/A",
        resources: [],
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Assistant to Pro</h2>
        <p className="text-xs text-white/40">5-pillar project consulting and planning</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What project would you like to plan?"
          className="message-input flex-1"
          disabled={isProcessing}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isProcessing}
          className="btn-primary flex items-center gap-2 px-5 cursor-pointer"
        >
          <Rocket size={16} />
          Generate Plan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
        {isProcessing && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RwandaSpinner size={48} />
              <p className="text-white/40 text-sm mt-4">Creating your project plan...</p>
              <p className="text-white/20 text-xs mt-1">Building 5-pillar framework</p>
            </div>
          </div>
        )}

        {!isProcessing && !plan && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full rwanda-gradient flex items-center justify-center">
                <Lightbulb size={24} className="text-white" />
              </div>
              <p className="text-white/40 text-sm">Describe your project or business idea</p>
              <p className="text-white/20 text-xs mt-1">I'll create a comprehensive 5-pillar plan</p>
            </div>
          </div>
        )}

        {plan && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {plan.pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 border-l-4"
                style={{ borderLeftColor: ["#e6c310", "#00a651", "#003478", "#e6c310", "#00a651"][i] }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60">Pillar {i + 1}</span>
                  <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                </div>
                <p className="text-sm text-white/60 mb-3">{pillar.description}</p>
                {pillar.steps.length > 0 && (
                  <ul className="space-y-1">
                    {pillar.steps.map((step, j) => (
                      <li key={j} className="flex gap-2 text-xs text-white/50">
                        <span className="text-[#e6c310] mt-0.5">→</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-[#e6c310]" />
                  <h3 className="text-sm font-semibold text-white">Timeline</h3>
                </div>
                <p className="text-sm text-white/60">{plan.timeline}</p>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-[#e6c310]" />
                  <h3 className="text-sm font-semibold text-white">Resources</h3>
                </div>
                <ul className="space-y-1">
                  {plan.resources.map((r, i) => (
                    <li key={i} className="text-xs text-white/50">• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
