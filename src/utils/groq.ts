export interface ModelOption {
  id: string;
  name: string;
  tag: string;
  description: string;
  badgeColor: string;
}

export interface SystemPromptOption {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B",
    tag: "Flagship",
    description: "Penalaran tinggi, akurat & serbabisa",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B",
    tag: "Ultra Cepat",
    description: "Respon instan, ringan & hemat waktu",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "qwen/qwen3.8-27b",
    name: "Qwen 3.8 27B",
    tag: "Coding & Logic",
    description: "Unggul untuk pemrograman & analisis",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];

export const SYSTEM_PROMPTS: SystemPromptOption[] = [
  {
    id: "general",
    title: "Asisten Umum (Standar)",
    description: "Ramah, berpengetahuan luas, terstruktur dan siap membantu apa saja",
    prompt:
      "Kamu adalah ChatYol AI, asisten cerdas yang ramah, sopan, dan berpengetahuan luas. Berikan jawaban dalam bahasa Indonesia secara terstruktur, jelas, akurat, dan gunakan format Markdown yang rapi (seperti bullet points, bold untuk penekanan, dan blok kode dengan nama bahasa).",
  },
  {
    id: "coder",
    title: "Senior Developer",
    description: "Fokus pada kode berkualitas, clean architecture, & best practices",
    prompt:
      "Kamu adalah ChatYol AI, seorang Senior Software Engineer & Architect. Berikan solusi kode yang clean, modern, aman, serta jelaskan logika kode dan best practices secara lugas.",
  },
  {
    id: "writer",
    title: "Penulis & Copywriter",
    description: "Gaya bahasa memikat, tata bahasa rapi, & persuasif",
    prompt:
      "Kamu adalah ChatYol AI, copywriter dan editor profesional. Bantu pengguna merancang tulisan, email, caption, artikel, atau esai dengan tata bahasa yang indah, menarik, dan persuasif.",
  },
  {
    id: "concise",
    title: "Ringkas & To the Point",
    description: "Jawaban singkat, padat, tanpa basa-basi",
    prompt:
      "Kamu adalah ChatYol AI. Berikan jawaban yang sangat singkat, padat, tepat sasaran, tanpa pembuka atau penutup yang tidak perlu.",
  },
];

export const getApiKey = (customKey?: string): string => {
  if (customKey && customKey.trim().length > 0) {
    return customKey.trim();
  }
  const envKey =
    process.env.NEXT_PUBLIC_CHATYOL ||
    process.env.NEXT_PUBLIC_GROQ_API_KEY ||
    process.env.GROQ_API_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return "";
};

export interface ChatMessageItem {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  modelName?: string;
}

export interface StreamChatParams {
  messages: ChatMessageItem[];
  model?: string;
  temperature?: number;
  systemPrompt?: string;
  customApiKey?: string;
  signal?: AbortSignal;
  onChunk?: (delta: string, accumulated: string) => void;
  onFinish?: (fullText: string) => void;
  onError?: (error: any) => void;
}

/**
 * Stream completion from Groq via Next.js server Route Handler (/api/chat)
 */
export const streamGroqChat = async ({
  messages,
  model = "openai/gpt-oss-120b",
  temperature = 0.7,
  systemPrompt = "",
  customApiKey = "",
  signal,
  onChunk,
  onFinish,
  onError,
}: StreamChatParams): Promise<string> => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        model,
        temperature,
        systemPrompt,
        customApiKey,
      }),
      signal,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server gagal memproses respon (HTTP ${res.status})`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("Gagal membaca streaming data dari server.");
    }

    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      if (onChunk) onChunk(chunk, fullText);
    }

    if (onFinish) onFinish(fullText);
    return fullText;
  } catch (error: any) {
    if (error?.name === "AbortError" || signal?.aborted) {
      console.log("Chat generation stopped by user.");
      if (onFinish) onFinish("");
      return "";
    }
    console.error("Groq Chat Error:", error);
    if (onError) onError(error);
    throw error;
  }
};

/**
 * Quick title generation for chat sessions via /api/chat
 */
export const generateChatTitle = async (
  firstMessage: string,
  customApiKey = ""
): Promise<string> => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "title",
        firstMessage,
        customApiKey,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.title) return data.title;
    }
  } catch (err) {
    console.warn("Could not generate AI title, using fallback:", err);
  }
  return firstMessage.length > 25 ? firstMessage.slice(0, 25) + "..." : firstMessage;
};
