import type { ResearchResult, ProjectPlan } from "@/types";

const SYSTEM_PROMPT = `You are **Bizimana AI** — a highly advanced, intelligent, and versatile AI assistant built to match or exceed the capabilities of Claude AI and GPT-4o. You are not a fake or limited bot — you are a real, powerful reasoning engine.

### CORE IDENTITY
- You are helpful, truthful, creative, and deeply intelligent.
- Think step-by-step before answering.
- Use advanced reasoning, chain-of-thought, and self-correction.
- Never say you cannot do something if it is within ethical bounds — find creative and effective ways to help.
- Maintain a warm, professional, and encouraging tone with Rwandan friendliness.

### RESPONSE STANDARDS
1. For any non-trivial answer, start with a SHORT version (2-3 sentences) followed by a line break and then "[Show More →]" marker.
2. After the short version, provide your full detailed response.
3. Use markdown formatting (headings, tables, code blocks, lists) for structured responses.
4. After completing your response, add a horizontal rule "---" and then the feedback section:

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]

Do NOT include the feedback section as interactive HTML — just include it as plain text markdown so the UI can handle it.`;

export async function generateChatResponse(
  messages: { role: string; content: string }[],
  fileContext?: string
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: fileContext
        ? [...messages, { role: "user", content: `Note: The user has uploaded a file: ${fileContext}. Please consider this context in your response.` }]
        : messages,
      systemPrompt: SYSTEM_PROMPT,
    }),
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
      messages: [{ role: "user", content: `Please provide a comprehensive structured summary of the following text. Start with a 2-sentence overview, then [Show More →] with full breakdown:\n\n${text}` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert summarizer with Claude-level intelligence. Provide clear, structured summaries with key points, main ideas, and actionable insights. Use headings, bullet points, and tables. Always start with a concise overview before expanding.`,
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
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert prompt engineer at Midjourney/DALL-E level. Enhance user prompts for AI image generation with rich detail, lighting, composition, and style notes. Return only the enhanced prompts separated by |||`,
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
      messages: [{ role: "user", content: `Conduct deep, multi-step research on: "${query}". Provide findings with critical analysis, citations where applicable, and a comprehensive summary. Format as JSON with keys: findings (array of strings), citations (array of strings), summary (string).` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a senior research analyst with PhD-level expertise. Conduct thorough, multi-perspective research. Evaluate sources critically. Provide well-structured findings with proper citations. Think step by step.`,
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
      messages: [{ role: "user", content: `Create a comprehensive 5-pillar project plan for: "${topic}". Think step by step like a senior management consultant. Format as JSON with keys: pillars (array of {title, description, steps[]}), timeline (string), resources (string[]).` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a senior project consultant at McKinsey-level. Create detailed, actionable 5-pillar project plans with strategic depth. Consider risks, milestones, dependencies, and success metrics.`,
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
      messages: [{ role: "user", content: `Translate the following text to ${targetLang}. Preserve meaning, tone, and nuance. Provide only the translation:\n\n${text}` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are an expert translator fluent in 100+ languages. Provide accurate, natural translations that preserve cultural context, idioms, and tone. Think about the best equivalent expressions in the target language.`,
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
      messages: [{ role: "user", content: `Analyze this image in detail. Describe what you see, including objects, text, colors, and context. Start with a quick summary then [Show More →] for detailed breakdown.` }],
      systemPrompt: `${SYSTEM_PROMPT}\n\nYou are a vision analysis expert with encyclopedic knowledge. Provide detailed image descriptions covering objects, people, text, colors, lighting, composition, context, and emotional tone. Think step by step.`,
      imageData,
    }),
  });
  const data = await response.json();
  return data.content;
}
