"use client";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] text-white pt-16 pb-16 sm:pt-20 sm:pb-24">
      {/* Background glow halus */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full bg-gradient-to-tr from-indigo-900/25 via-indigo-600/15 to-cyan-500/10 blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl text-center">
        {/* Eyebrow badge minimalis */}
        <div className="flex justify-center mb-5">
          <Link
            href="/chat"
            prefetch={true}
            className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 hover:border-indigo-400/50 px-3 py-1 rounded-full text-xs font-medium text-cyan-300 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <span>ChatYol AI v1.0</span>
            <span className="text-white/30">•</span>
            <span className="text-gray-300 hover:text-white flex items-center gap-1">
              Buka Aplikasi →
            </span>
          </Link>
        </div>

        {/* Headline utama: Bersih, tegas, profesional */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          ChatYol <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
        </h1>

        {/* Subtitle ringkas & padat */}
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed">
          Asisten cerdas untuk menjawab pertanyaan, membantu tugas, dan mempercepat produktivitas harian Anda.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/chat"
            prefetch={true}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Coba Sekarang →
          </Link>
          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
          >
            Lihat Tampilan ↓
          </a>
        </div>
      </div>
    </section>
  );
};
