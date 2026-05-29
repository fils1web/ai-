"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { TabId, FloatingAction, Message } from "@/types";

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activeFloatingAction: FloatingAction | null;
  setActiveFloatingAction: (action: FloatingAction | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSafetyMode: boolean;
  toggleSafetyMode: () => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  messages: Record<TabId, Message[]>;
  addMessage: (tab: TabId, message: Message) => void;
  clearMessages: (tab: TabId) => void;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("chat");
  const [activeFloatingAction, setActiveFloatingAction] = useState<FloatingAction | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSafetyMode, setIsSafetyMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Record<TabId, Message[]>>({
    chat: [],
    summary: [],
    image: [],
    research: [],
    pro: [],
    translator: [],
    settings: [],
  });

  const addMessage = useCallback((tab: TabId, message: Message) => {
    setMessages((prev) => ({
      ...prev,
      [tab]: [...prev[tab], message],
    }));
  }, []);

  const clearMessages = useCallback((tab: TabId) => {
    setMessages((prev) => ({
      ...prev,
      [tab]: [],
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("light");
  }, []);

  const toggleSafetyMode = useCallback(() => {
    setIsSafetyMode((prev) => !prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeFloatingAction,
        setActiveFloatingAction,
        isDarkMode,
        toggleDarkMode,
        isSafetyMode,
        toggleSafetyMode,
        uploadedFile,
        setUploadedFile,
        messages,
        addMessage,
        clearMessages,
        isProcessing,
        setIsProcessing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
