"use client";

import Image from "next/image";
import Link from "next/link";

export const ProductShowcase = () => {
  return (
    <section
      id="showcase"
      className="bg-[#030712] text-white py-14 sm:py-18 relative scroll-mt-12"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
        <div>
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Tampilan Aplikasi
          </span>
          <h2 className="mt-2 font-bold text-3xl sm:text-4xl text-white">
            Antarmuka Modern & Cepat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-md mx-auto">
            Dilengkapi multi-model AI, riwayat obrolan otomatis, dan respon streaming instan.
          </p>
        </div>

        {/* Frame Mockup Browser Bersih */}
        <div className="mt-8 rounded-xl border border-white/10 bg-gray-950 p-2 sm:p-2.5 shadow-2xl max-w-3xl mx-auto">
          {/* Header Bar Browser */}
          <div className="flex items-center justify-between px-3 py-2 bg-gray-900/80 rounded-t-lg border-b border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-gray-400">chatyol.app/chat</span>
            <Link
              href="/chat"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Buka App →
            </Link>
          </div>

          {/* Gambar Screenshot Chatbot Asli Terbaru */}
          <div className="overflow-hidden rounded-b-lg bg-[#09090b]">
            <Image
              src="/chatyol-app.png"
              alt="Screenshot Tampilan Chatbot ChatYol AI Terbaru"
              width={1024}
              height={460}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
