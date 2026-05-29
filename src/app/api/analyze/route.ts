import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const fileType = file.type;
    const fileName = file.name;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        analysis: `📄 **File Analysis: ${fileName}**\n\n**Type:** ${fileType || "Unknown"}\n**Size:** ${(file.size / 1024).toFixed(1)} KB\n\nI've received your file. In full AI mode, I would analyze the contents in detail. For now, here's what I can tell you:\n- The file has been uploaded successfully\n- File name: ${fileName}\n- File type: ${fileType || "Unknown"}\n- File size: ${(file.size / 1024).toFixed(1)} KB\n\nPlease add your OpenAI API key to enable deep document analysis.`,
      });
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
          {
            role: "system",
            content: "You are Bizimana AI's document analysis engine. Analyze the provided file contents and give a thorough, structured analysis including key topics, main points, and actionable insights.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Please analyze this file: ${fileName} (${fileType})` },
              { type: "image_url", image_url: { url: `data:${fileType};base64,${base64}`, detail: "high" } },
            ],
          },
        ],
        max_tokens: 2048,
      }),
    });

    const data = await response.json();
    return NextResponse.json({
      analysis: data.choices?.[0]?.message?.content || "Analysis complete but no insights were generated.",
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { analysis: "I encountered an error while analyzing the file. Please try again." },
      { status: 500 }
    );
  }
}
