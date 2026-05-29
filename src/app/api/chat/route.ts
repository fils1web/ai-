import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt, imageData } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    const useClaude = !!process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: `Hello! I'm **Bizimana AI**, your powerful intelligent assistant. I'm currently running in demo mode.

[Show More →]

To unlock my full capabilities — including advanced reasoning, coding, vision analysis, deep research, and document intelligence — please add your **OpenAI API key** or **Anthropic API key** to your environment variables (\`.env.local\`).

**What I can still help you with:**
- General conversation and Q&A
- File analysis and document understanding
- Structured summaries and research
- Translation between 100+ languages
- Project planning and strategy consulting

**Getting Started:**
1. Create a \`.env.local\` file in the project root
2. Add \`OPENAI_API_KEY=your_key_here\` or \`ANTHROPIC_API_KEY=your_key_here\`
3. Restart the dev server

---

**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`,
      });
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
