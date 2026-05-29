"use client";

import { motion, AnimatePresence } from "framer-motion";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import TabNavigation from "@/components/TabNavigation";
import FloatingMenu from "@/components/FloatingMenu";
import AuthGate from "@/components/AuthGate";
import ChatTab from "@/components/ChatTab";
import SummaryTab from "@/components/SummaryTab";
import ImageGenerationTab from "@/components/ImageGenerationTab";
import DeepResearchTab from "@/components/DeepResearchTab";
import AssistantToProTab from "@/components/AssistantToProTab";
import LiveTranslatorTab from "@/components/LiveTranslatorTab";
import SettingsTab from "@/components/SettingsTab";
import { useApp } from "@/context/AppContext";
import type { TabId } from "@/types";
import { Sparkles } from "lucide-react";

const tabComponents: Record<TabId, React.ReactNode> = {
  chat: <ChatTab />,
  summary: <SummaryTab />,
  image: <ImageGenerationTab />,
  research: <DeepResearchTab />,
  pro: <AssistantToProTab />,
  translator: <LiveTranslatorTab />,
  settings: <SettingsTab />,
};

export default function Home() {
  const { activeTab, customLogo, appName } = useApp();

  return (
    <AuthGate>
      <div className="flex flex-col h-screen text-white">
        <BackgroundSlideshow />

        <header className="glass border-b border-white/5 px-4 py-2 z-30">
          <div className="max-w-6xl mx-auto flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Logo"
                  className="w-8 h-8 rounded-lg object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg rwanda-gradient flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}
              <div>
                <h1 className="text-base font-bold tracking-tight">
                  <span className="text-[#e6c310]">{appName}</span>
                  <span className="text-white/80"> AI</span>
                </h1>
                <p className="text-[10px] text-white/30 -mt-0.5">Intelligent Assistant</p>
              </div>
            </div>
          </div>
          <TabNavigation />
        </header>

        <main className="flex-1 overflow-hidden z-20">
          <div className="h-full max-w-4xl mx-auto px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {tabComponents[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <FloatingMenu />
      </div>
    </AuthGate>
  );
}
