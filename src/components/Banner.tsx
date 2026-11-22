import Link from "next/link";

export const Banner = () => {
  return (
    <aside aria-label="Pengumuman" className="py-2 px-4 text-center bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 border-b border-indigo-500/20 text-indigo-200 text-xs sm:text-sm">
      <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/30 text-cyan-300 border border-indigo-400/30">
          v1.0
        </span>
        <span className="text-white/90">
          ChatYol AI sudah aktif dan siap digunakan.
        </span>
        <Link
          href="/chat"
          prefetch={true}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1"
        >
          Buka Aplikasi →
        </Link>
      </div>
    </aside>
  );
};
