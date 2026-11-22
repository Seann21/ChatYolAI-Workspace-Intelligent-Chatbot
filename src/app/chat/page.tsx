import type { Metadata } from "next";
import ChatApp from "@/components/chat/ChatApp";

export const metadata: Metadata = {
  title: "ChatYol AI - Asisten Cerdas Berkecepatan Tinggi",
  description: "Mulai percakapan dengan ChatYol AI bertenaga Groq LPU engine untuk penalaran instan, coding, dan produktivitas.",
};

export default function ChatPage() {
  return <ChatApp />;
}

