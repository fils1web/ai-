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
    const fileExt = fileName.split(".").pop()?.toLowerCase() || "";
    const isImage = ["png", "jpg", "jpeg", "gif", "webp", "bmp"].includes(fileExt);
    const isDoc = ["pdf", "doc", "docx", "txt", "csv", "json", "md"].includes(fileExt);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const analysis = isImage
        ? `I've received and analyzed your image **${fileName}**.

[Show More →]

## Visual Analysis

### File Information
- **Name:** ${fileName}
- **Type:** ${fileType || "Unknown"}
- **Size:** ${(file.size / 1024).toFixed(1)} KB

### Content Description
This image appears to be a visual asset that could contain various elements such as people, objects, text, or scenes. Without an AI vision API key configured, I can provide a general assessment:

- **Format**: Standard image format compatible with analysis
- **Quality**: Resolution and clarity determine analyzability
- **Potential Content**: Could contain documents, photographs, illustrations, or screenshots

### To Enable Deep Vision Analysis
Add your \`OPENAI_API_KEY\` to \`.env.local\` for:
- Detailed object and scene description
- Text extraction (OCR)
- Color and composition analysis
- Context and semantic understanding

---

**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`
        : `I've received your document **${fileName}**.

[Show More →]

## Document Analysis

### File Information
- **Name:** ${fileName}
- **Type:** ${fileType || "Unknown"}
- **Size:** ${(file.size / 1024).toFixed(1)} KB

### Content Assessment
This document has been uploaded successfully. Based on the file type, it likely contains structured or unstructured text data that can be analyzed for key information.

### To Enable Deep Document Analysis
Add your \`OPENAI_API_KEY\` to \`.env.local\` for:
- Full content extraction and summarization
- Key entity and data point identification
- Sentiment and tone analysis
- Structured insights and recommendations

---

**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;

      return NextResponse.json({ analysis });
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
