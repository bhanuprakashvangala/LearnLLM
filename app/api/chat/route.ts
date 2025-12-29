import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Available models on Groq (all free)
const MODELS = {
  "llama-3.3-70b": "llama-3.3-70b-versatile",
  "llama-3.1-8b": "llama-3.1-8b-instant",
  "mixtral-8x7b": "mixtral-8x7b-32768",
  "gemma2-9b": "gemma2-9b-it",
} as const;

// Lazy initialization of Groq client
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }
  return new Groq({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model = "llama-3.3-70b", temperature = 0.7, maxTokens = 1024 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured. Please add GROQ_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const groq = getGroqClient();
    const modelId = MODELS[model as keyof typeof MODELS] || MODELS["llama-3.3-70b"];

    // Create chat completion with streaming
    const completion = await groq.chat.completions.create({
      model: modelId,
      messages: messages,
      temperature: Math.min(Math.max(temperature, 0), 2),
      max_tokens: Math.min(Math.max(maxTokens, 1), 4096),
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const errorMessage = error instanceof Error ? error.message : "Failed to generate response";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Non-streaming version for simple requests
export async function GET() {
  return NextResponse.json({
    models: Object.keys(MODELS),
    status: process.env.GROQ_API_KEY ? "ready" : "api_key_missing",
    provider: "Groq",
  });
}
