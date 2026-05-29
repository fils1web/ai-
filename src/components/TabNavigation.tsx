"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import type { TabId } from "@/types";
import {
  MessageSquare,
  FileText,
  Image,
  Search,
  Rocket,
  Globe,
  Settings,
} from "lucide-react";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "chat", label: "General Chat", icon: <MessageSquare size={16} /> },
  { id: "summary", label: "Summary", icon: <FileText size={16} /> },
  { id: "image", label: "Image Generation", icon: <Image size={16} /> },
  { id: "research", label: "Deep Research", icon: <Search size={16} /> },
  { id: "pro", label: "Assistant to Pro", icon: <Rocket size={16} /> },
  { id: "translator", label: "Live Translator", icon: <Globe size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

export default function TabNavigation() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="flex items-center gap-1 overflow-x-auto px-2 py-1 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "text-[#e6c310]"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white/8 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
