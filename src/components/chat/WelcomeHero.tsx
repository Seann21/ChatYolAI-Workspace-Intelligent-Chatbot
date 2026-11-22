"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Code2, Sparkles, FileText, Cpu, ArrowUpRight } from './Icons';

interface WelcomeHeroProps {
  onSelectPrompt: (prompt: string) => void;
  activeModelName?: string;
}

const SUGGESTIONS = [
  {
    icon: Code2,
    tag: "Coding",
    title: "Jelaskan React Hooks",
    desc: "Perbedaan useState & useEffect beserta contoh kasus nyata",
    prompt: "Jelaskan konsep React Hooks (terutama useState dan useEffect) dengan analogi sederhana dan contoh kode yang praktis.",
  },
  {
    icon: Cpu,
    tag: "Arsitektur",
    title: "Optimasi Web Frontend",
    desc: "Tips praktis meningkatkan skor Core Web Vitals & performa",
    prompt: "Apa saja langkah-langkah konkret untuk mengoptimasi performa loading dan interaktivitas website modern?",
  },
  {
    icon: FileText,
    tag: "Karier",
    title: "Email Lamaran Kerja",
    desc: "Format profesional dan meyakinkan untuk posisi Web Developer",
    prompt: "Tuliskan draf email lamaran pekerjaan yang profesional dan persuasif untuk posisi Frontend Developer di sebuah startup teknologi.",
  },
  {
    icon: Sparkles,
    tag: "Ide",
    title: "Ide Portofolio Menarik",
    desc: "3 konsep proyek web unik untuk menarik minat recruiter",
    prompt: "Berikan 3 ide proyek web portofolio yang inovatif, tidak klise, dan menonjolkan kemampuan technical problem-solving.",
  },
];

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onSelectPrompt }) => {
  const [logoSrc, setLogoSrc] = useState('/Chatyol-ai.png');

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full text-center">
      {/* Bot Identity */}
      <div className="relative mb-5 group">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-zinc-900 border border-indigo-500/30 flex items-center justify-center p-1 shadow-lg shadow-indigo-950/30 transition-transform group-hover:scale-105">
          <Image
            src={logoSrc}
            alt="ChatYol AI"
            width={72}
            height={72}
            className="w-full h-full object-contain rounded-xl"
            onError={() => setLogoSrc('/Chatyol.svg')}
          />
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-950" title="Online"></span>
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
        ChatYol AI
      </h1>
      <p className="text-zinc-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
        Asisten AI pintar generasi terbaru dengan pemrosesan Groq berkecepatan tinggi. Siap membantu coding, menulis, analisis, dan brainstorming.
      </p>

      {/* Suggestion Cards */}
      <div className="w-full text-left">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 px-1">
          Mulai dengan pertanyaan populer
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {SUGGESTIONS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => onSelectPrompt(item.prompt)}
                className="group relative flex flex-col justify-between p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all text-left shadow-sm hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-zinc-800 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                        <IconComponent size={16} />
                      </div>
                      <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;

