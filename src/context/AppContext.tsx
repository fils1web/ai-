"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { TabId, FloatingAction, Message, AIMode } from "@/types";

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activeFloatingAction: FloatingAction | null;
  setActiveFloatingAction: (action: FloatingAction | null) => void;
  activeMode: AIMode;
  setActiveMode: (mode: AIMode) => void;
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
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
  customLogo: string | null;
  setCustomLogo: (v: string | null) => void;
  appName: string;
  setAppName: (v: string) => void;
}

const AUTH_EMAIL = "fils4rever@gmail.com";
const AUTH_PASSWORD = "*#Fils*#12@@";
const AUTH_KEY = "bizimana_auth";
const LOGO_KEY = "bizimana_logo";
const NAME_KEY = "bizimana_name";

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("chat");
  const [activeFloatingAction, setActiveFloatingAction] = useState<FloatingAction | null>(null);
  const [activeMode, setActiveMode] = useState<AIMode>("general");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSafetyMode, setIsSafetyMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setAuthenticatedState] = useState(false);
  const [customLogo, setCustomLogoState] = useState<string | null>(null);
  const [appName, setAppNameState] = useState("Bizimana");
  const [messages, setMessages] = useState<Record<TabId, Message[]>>({
    chat: [],
    summary: [],
    image: [],
    research: [],
    pro: [],
    translator: [],
    settings: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === "true") {
      setAuthenticatedState(true);
    }
    const logo = localStorage.getItem(LOGO_KEY);
    if (logo) setCustomLogoState(logo);
    const name = localStorage.getItem(NAME_KEY);
    if (name) setAppNameState(name);
  }, []);

  const setAuthenticated = useCallback((v: boolean) => {
    setAuthenticatedState(v);
    if (v) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const setCustomLogo = useCallback((v: string | null) => {
    setCustomLogoState(v);
    if (v) {
      localStorage.setItem(LOGO_KEY, v);
    } else {
      localStorage.removeItem(LOGO_KEY);
    }
  }, []);

  const setAppName = useCallback((v: string) => {
    setAppNameState(v);
    localStorage.setItem(NAME_KEY, v);
  }, []);

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
        activeMode,
        setActiveMode,
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
        isAuthenticated,
        setAuthenticated,
        customLogo,
        setCustomLogo,
        appName,
        setAppName,
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

export { AUTH_EMAIL, AUTH_PASSWORD };
