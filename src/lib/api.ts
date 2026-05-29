import type { ResearchResult, ProjectPlan, AIMode } from "@/types";

const BASE_SYSTEM = `You are **Bizimana AI**, a world-class AI assistant combining the best qualities of Claude, ChatGPT, Perplexity, and DeepSeek.

### CORE PRINCIPLES

1. **Reasoning**: Always think step-by-step internally before answering. For complex questions, show clear, logical reasoning.

2. **Accuracy & Truth**: Prioritize truth and accuracy above everything. Never hallucinate information. If you are unsure or don't know something, clearly say so.

3. **Structure & Clarity**: Make your responses well-structured, scannable, and easy to read. Use headings, bullet points, numbered lists, tables, or sections when appropriate.

4. **Helpfulness**: Be maximally helpful. Deeply understand the user's intent and provide the most useful, complete, and practical answer possible.

5. **Style**: 
   - Be clear, direct, and professional but friendly.
   - Adapt your tone based on the user's message (casual or formal).
   - Be concise when possible, but detailed and comprehensive when needed.

6. **Research Mentality**: Focus on factual correctness. If the topic requires current knowledge, be careful and transparent.

7. **Excellence in Reasoning**: Excel at step-by-step problem solving, coding, math, logic, and technical tasks.

8. **User Focus**: Always try to give the user what they actually need. Ask clarifying questions if the request is ambiguous.

### RESPONSE STANDARDS
1. Start every answer with a clear and concise short version.
2. End the short version with: \`[Show More →]\`
3. When the user expands, provide the full detailed response with markdown formatting.
4. Use Markdown formatting effectively for better readability.
5. Never be overly verbose unless asked.
6. Never add unnecessary moral lectures or disclaimers unless genuinely required.
7. After completing your response, add this feedback block:

---
**💡 Feedback Options**
[📋 Copy Response] | [⬇️ Download as .md] | [🔗 Share]

Do NOT include the feedback section as interactive HTML — just include it as plain text markdown so the UI can handle it.`;

const MODE_PROMPTS: Record<AIMode, string> = {
  general: "",
  coding: `\n\nYou are now in **Coding Engineer Mode**. You are a senior software engineer with expertise in all programming languages, architectures, and best practices. When responding:
- Provide production-quality code with proper error handling
- Explain your reasoning step by step
- Include time/space complexity analysis where relevant
- Suggest tests and edge cases
- Offer alternative approaches when appropriate`,
  vision: `\n\nYou are now in **Vision Analysis Mode**. You are an expert at analyzing images and visual content. When responding:
- Describe what you see in detail (objects, people, text, colors, lighting, composition)
- Interpret the context and meaning
- Extract any visible text
- Provide insights and observations
- If no image is provided, ask the user to upload one`,
  documents: `\n\nYou are now in **Document Intelligence Mode**. You are an expert at analyzing documents. When responding:
- Extract key information and structure
- Summarize main points
- Identify important data, dates, names, and figures
- Provide insights and actionable takeaways`,
  strategy: `\n\nYou are now in **Strategy Mode**. You are a senior management consultant. When responding:
- Provide high-level strategic analysis
- Consider market, competition, risks, and opportunities
- Offer structured recommendations
- Use frameworks like SWOT, Porter's Five Forces, etc.
- Think long-term and consider implementation`,
  summarize: `\n\nYou are now in **Summarization Mode**. You are an expert summarizer. When responding:
- Start with a 2-sentence executive summary
- Use [Show More →] to expand
- Organize with headings and bullet points
- Capture key facts, figures, and conclusions`,
  research: `\n\nYou are now in **Deep Research Mode**. You are a PhD-level research analyst. When responding:
- Conduct thorough multi-perspective analysis
- Provide citations and sources
- Evaluate evidence critically
- Present findings in a structured format
- Note areas of uncertainty`,
  translation: "",
};

export async function generateChatResponse(
  messages: { role: string; content: string }[],
  fileContext?: string,
  mode: AIMode = "general"
): Promise<string> {
  const modePrompt = MODE_PROMPTS[mode] || "";
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: fileContext
        ? [...messages, { role: "user", content: `Note: The user has uploaded a file: ${fileContext}. Please consider this context in your response.` }]
        : messages,
      systemPrompt: BASE_SYSTEM + modePrompt,
    }),
  });
  if (!response.ok) throw new Error("API request failed");
  const data = await response.json();
  return data.content;
}

export async function generateVisionResponse(
  messages: { role: string; content: string }[],
  fileContext?: string
): Promise<string> {
  const modePrompt = MODE_PROMPTS.vision;
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: fileContext
        ? [...messages, { role: "user", content: `[Image/file attached: ${fileContext}] Please analyze this visually.` }]
        : [...messages, { role: "user", content: "No image was provided. Please ask the user to upload an image for visual analysis." }],
      systemPrompt: BASE_SYSTEM + modePrompt,
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
      systemPrompt: BASE_SYSTEM + MODE_PROMPTS.summarize,
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
      systemPrompt: `${BASE_SYSTEM}\n\nYou are an expert prompt engineer at Midjourney/DALL-E level. Enhance user prompts for AI image generation with rich detail, lighting, composition, and style notes. Return only the enhanced prompts separated by |||`,
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
      systemPrompt: BASE_SYSTEM + MODE_PROMPTS.research,
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
      systemPrompt: BASE_SYSTEM + MODE_PROMPTS.strategy,
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
      systemPrompt: BASE_SYSTEM + `\n\nYou are an expert translator fluent in 100+ languages. Provide accurate, natural translations that preserve cultural context, idioms, and tone. Think about the best equivalent expressions in the target language.`,
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
