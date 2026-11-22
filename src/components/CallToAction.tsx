import Link from "next/link";

export const CallToAction = () => {
  return (
    <section id="cta" className="bg-[#030712] text-white py-14 sm:py-18 relative scroll-mt-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-gray-950 p-6 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Coba ChatYol AI Sekarang
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-md mx-auto">
            Mulai percakapan Anda dan rasakan kemudahan menyelesaikan tugas dengan bantuan AI.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat"
              prefetch={true}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Buka Chatbot →
            </Link>
            <a
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              Kembali ke Atas ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
