import { NextRequest } from "next/server";
import { Groq } from "groq-sdk";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, firstMessage, messages, model, temperature, systemPrompt, customApiKey } = body;

    const apiKey =
      (customApiKey && typeof customApiKey === "string" && customApiKey.trim().length > 0)
        ? customApiKey.trim()
        : (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.NEXT_PUBLIC_CHATYOL || "");

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "API Key belum dikonfigurasi. Tambahkan GROQ_API_KEY atau NEXT_PUBLIC_CHATYOL pada Environment Variables.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const groq = new Groq({ apiKey });

    // Handle Title Generation request
    if (action === "title") {
      try {
        const titleRes = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Buatkan judul singkat (maksimal 4 kata) tanpa tanda kutip untuk topik percakapan berikut.",
            },
            {
              role: "user",
              content: firstMessage || "Halo",
            },
          ],
          model: "openai/gpt-oss-20b",
          max_tokens: 20,
          temperature: 0.5,
        });
        const title = titleRes.choices[0]?.message?.content?.trim().replace(/["']/g, "") || "";
        return new Response(JSON.stringify({ title }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ title: firstMessage?.slice(0, 25) || "Percakapan" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Handle Chat Stream request
    const formattedMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
    if (systemPrompt && typeof systemPrompt === "string" && systemPrompt.trim()) {
      formattedMessages.push({
        role: "system",
        content: systemPrompt.trim(),
      });
    }

    if (Array.isArray(messages)) {
      messages.forEach((m: any) => {
        if (m.role && m.content) {
          formattedMessages.push({
            role: m.role,
            content: m.content,
          });
        }
      });
    }

    const stream = await groq.chat.completions.create({
      messages: formattedMessages,
      model: model || "openai/gpt-oss-120b",
      temperature: Number(temperature) || 0.7,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Groq API Route Error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

