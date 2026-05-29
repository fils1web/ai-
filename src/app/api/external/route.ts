import { NextResponse } from "next/server";
import { generateLocalResponse } from "@/lib/local-ai";

const API_KEY = process.env.BIZIMANA_API_KEY || "sk-bizimana-dev";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  };
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status, headers: corsHeaders() });
}

function successResponse(data: Record<string, unknown>) {
  return NextResponse.json({ success: true, ...data }, { headers: corsHeaders() });
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key") || "";
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("api_key") || "";

  if (authHeader !== `Bearer ${API_KEY}` && authHeader !== API_KEY && queryKey !== API_KEY) {
    return successResponse({
      name: "Bizimana AI API",
      version: "1.0.0",
      description: "External REST API for Bizimana AI — a conversational AI assistant",
      status: "running",
      auth: "Send Authorization: Bearer YOUR_API_KEY or X-API-Key: YOUR_API_KEY header",
      usage: {
        POST: {
          endpoint: "/api/external",
          body: {
            message: "string (required) — Your question or prompt",
            mode: "string (optional) — general, coding, research, strategy, summarize, translation",
            conversation: "array (optional) — Previous messages for context [{role, content}]",
            stream: "boolean (optional) — Set true for SSE streaming response",
          },
          example: `curl -X POST https://your-site.com/api/external \\
  -H "Authorization: Bearer ${API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What is Rwanda known for?", "mode": "general"}'`,
        },
        GET: {
          description: "This help page. Requires no auth.",
          query: { api_key: "string (optional) — API key as query param" },
        },
      },
      limits: {
        max_message_length: 5000,
        max_conversation_turns: 50,
        rate_limit: "60 requests per minute",
      },
    });
  }

  const message = url.searchParams.get("message") || "";
  const mode = url.searchParams.get("mode") || "general";

  if (message) {
    const content = generateLocalResponse(message, mode, []);
    return successResponse({
      message,
      mode,
      response: content,
      timestamp: new Date().toISOString(),
    });
  }

  return errorResponse("Missing required parameter: message", 400);
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key") || "";
    const contentType = request.headers.get("content-type") || "";

    if (authHeader !== `Bearer ${API_KEY}` && authHeader !== API_KEY) {
      return errorResponse("Invalid or missing API key. Provide via Authorization: Bearer YOUR_KEY or X-API-Key header", 401);
    }

    if (contentType.includes("text/event-stream")) {
      return handleStreaming(request);
    }

    const body = await request.json();
    const message = body.message || "";
    const mode = body.mode || "general";
    const conversation = body.conversation || [];
    const stream = body.stream === true;

    if (!message || message.trim().length === 0) {
      return errorResponse("Missing required field: message", 400);
    }

    if (message.length > 5000) {
      return errorResponse("Message exceeds maximum length of 5000 characters", 413);
    }

    if (stream) {
      return handleStreaming(request);
    }

    const content = generateLocalResponse(message, mode, conversation);

    return successResponse({
      message,
      mode,
      response: content,
      conversation_length: conversation.length + 1,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("External API error:", err);
    return errorResponse("Internal server error", 500);
  }
}

async function handleStreaming(request: Request): Promise<Response> {
  try {
    const body = await request.json().catch(() => ({ message: "", mode: "general", conversation: [] }));
    const message = body.message || "";
    const mode = body.mode || "general";
    const conversation = body.conversation || [];

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }

    const fullResponse = generateLocalResponse(message, mode, conversation);
    const encoder = new TextEncoder();
    const chunks = splitIntoChunks(fullResponse, 3);

    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const data = JSON.stringify({ type: "chunk", content: chunk });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          await new Promise((r) => setTimeout(r, 30));
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", timestamp: new Date().toISOString() })}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...corsHeaders(),
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Stream error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }
}

function splitIntoChunks(text: string, targetSentences: number): string[] {
  const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) || [text];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += targetSentences) {
    chunks.push(sentences.slice(i, i + targetSentences).join(""));
  }
  return chunks.length > 0 ? chunks : [text];
}
