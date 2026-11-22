export default function ChatLoading() {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Skeleton (hidden on mobile) */}
      <div className="hidden md:flex flex-col w-64 sm:w-72 border-r border-zinc-800/80 bg-zinc-950 p-3.5 space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
            <div className="w-24 h-4 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-full h-8 bg-zinc-900 rounded-xl animate-pulse" />
        <div className="space-y-2 pt-2">
          <div className="w-full h-7 bg-zinc-900/60 rounded-lg animate-pulse" />
          <div className="w-full h-7 bg-zinc-900/40 rounded-lg animate-pulse" />
          <div className="w-full h-7 bg-zinc-900/30 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Main Chat Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Header Skeleton */}
        <div className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-zinc-800 rounded animate-pulse" />
            <div className="w-28 h-4 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="w-32 h-7 bg-zinc-900 rounded-lg animate-pulse" />
        </div>

        {/* Center Hero Skeleton */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
          <div className="w-48 h-8 bg-zinc-800 rounded-lg animate-pulse" />
          <div className="w-72 sm:w-96 h-4 bg-zinc-900 rounded animate-pulse" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-6">
            <div className="h-24 rounded-xl bg-zinc-900/60 border border-zinc-800 animate-pulse" />
            <div className="h-24 rounded-xl bg-zinc-900/60 border border-zinc-800 animate-pulse" />
          </div>
        </div>

        {/* Input Bar Skeleton */}
        <div className="w-full max-w-3xl mx-auto px-4 pb-4">
          <div className="h-12 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

