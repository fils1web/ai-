import { NextResponse } from "next/server";
import { generateLocalResponse } from "@/lib/local-ai";

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt, imageData } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    const useClaude = !!process.env.ANTHROPIC_API_KEY;

    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const userContent = lastUserMsg?.content || "";

    const modeMatch = systemPrompt?.match(/Coding Engineer Mode|Vision Analysis Mode|Deep Research Mode|Summarization Mode|Strategy Mode|Translation/i);
    let mode = "general";
    if (modeMatch) {
      const match = modeMatch[0];
      if (match.includes("Coding")) mode = "coding";
      else if (match.includes("Vision")) mode = "vision";
      else if (match.includes("Research")) mode = "research";
      else if (match.includes("Summar")) mode = "summarize";
      else if (match.includes("Strategy")) mode = "strategy";
      else if (match.includes("Transl")) mode = "translation";
    }

    if (!apiKey) {
      const localResponse = generateLocalResponse(userContent, mode, messages);
      return NextResponse.json({ content: localResponse });
    }

    if (useClaude) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: systemPrompt,
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: imageData && m.role === "user"
              ? [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageData } }, { type: "text", text: m.content }]
              : m.content,
          })),
        }),
      });
      const data = await response.json();
      return NextResponse.json({ content: data.content?.[0]?.text || "No response generated." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 4096,
      }),
    });
    const data = await response.json();
    return NextResponse.json({ content: data.choices?.[0]?.message?.content || "No response generated." });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
