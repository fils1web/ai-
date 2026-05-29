export type TabId =
  | "chat"
  | "summary"
  | "image"
  | "research"
  | "pro"
  | "translator"
  | "settings";

export type FloatingAction =
  | "research"
  | "coding"
  | "translation"
  | "vision"
  | "documents"
  | "strategy"
  | "summarize";

export type AIMode =
  | "general"
  | "coding"
  | "vision"
  | "documents"
  | "strategy"
  | "summarize"
  | "research"
  | "translation";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ResearchResult {
  query: string;
  findings: string[];
  citations: string[];
  summary: string;
}

export interface ProjectPlan {
  pillars: {
    title: string;
    description: string;
    steps: string[];
  }[];
  timeline: string;
  resources: string[];
}
