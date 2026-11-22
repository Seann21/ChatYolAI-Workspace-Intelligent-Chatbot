import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "ChatYol AI | Intelligent Workspace & Productivity Assistant",
  description:
    "Accelerate your daily workflow with ChatYol AI. Fast answers, smart contextual reasoning, and code assistance built for modern productivity.",
  icons: {
    icon: "/Chatyol.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={clsx(dmSans.className, "antialiased selection:bg-indigo-500/30 selection:text-white")}>
        {children}
      </body>
    </html>
  );
}
