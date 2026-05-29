import type { ResearchResult, ProjectPlan } from "@/types";

const SYSTEM_PROMPT = `You are **Bizimana AI** — a powerful, friendly, and professional AI assistant designed to help users in Rwanda and around the world.

Global Features:
- Provide helpful, accurate, and culturally aware responses
- Support file analysis, vision analysis, and document intelligence
- Use Rwanda-inspired design principles in your thinking
- Be concise but thorough

Safety Principles:
- Never generate harmful, deceptive, or unethical content
- Respect user privacy and data security
- Promote inclusive and respectful dialogue
- When uncertain, acknowledge limitations honestly`;

export async function generateChatResponse(
  messages: { role: string; content: string }[],
  fileContext?: string
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt: SYSTEM_PROMPT, fileContext }),
  });
  if (!response.ok) throw new Error("API request failed");
  const data = await response.json();
  return data.content;
}

export async function generateSummary(text: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Please provide a comprehensive structured summary of the following text:\n\n${text}` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert summarizer. Provide clear, structured summaries with key points, main ideas, and actionable insights.`,
    }),
  });
  const data = await response.json();
  return data.content;
}

export async function generateImage(prompt: string, count: number = 4): Promise<string[]> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Generate detailed image generation prompts for: "${prompt}". Create ${count} variations with different styles (realistic, artistic, cinematic, minimalist). Return only the enhanced prompts separated by |||` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert prompt engineer. Enhance user prompts for AI image generation.`,
    }),
  });
  const data = await response.json();
  return data.content.split("|||").map((p: string) => p.trim()).filter(Boolean);
}

export async function conductResearch(query: string): Promise<ResearchResult> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Conduct deep research on: "${query}". Provide findings, citations, and a summary. Format as JSON with keys: findings (array of strings), citations (array of strings), summary (string).` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a research analyst. Provide well-structured research with citations.`,
    }),
  });
  const data = await response.json();
  try {
    return JSON.parse(data.content);
  } catch {
    return {
      query,
      findings: [data.content],
      citations: [],
      summary: data.content,
    };
  }
}

export async function generateProjectPlan(topic: string): Promise<ProjectPlan> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Create a comprehensive 5-pillar project plan for: "${topic}". Format as JSON with keys: pillars (array of {title, description, steps[]}), timeline (string), resources (string[]).` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a senior project consultant. Create detailed 5-pillar project plans.`,
    }),
  });
  const data = await response.json();
  try {
    return JSON.parse(data.content);
  } catch {
    return {
      pillars: [{ title: "Project Overview", description: data.content, steps: ["Review and refine"] }],
      timeline: "To be determined",
      resources: ["Additional consultation recommended"],
    };
  }
}

export async function translateText(text: string, targetLang: string = "advanced english"): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Translate the following text to ${targetLang}. Provide only the translation:\n\n${text}` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert translator fluent in 100+ languages. Provide accurate, natural translations.`,
    }),
  });
  const data = await response.json();
  return data.content;
}

export async function analyzeFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.analysis;
}

export async function analyzeVision(imageData: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: `Analyze this image in detail. Describe what you see, including objects, text, colors, and context.` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a vision analysis expert. Provide detailed image descriptions.`,
      imageData,
    }),
  });
  const data = await response.json();
  return data.content;
}
