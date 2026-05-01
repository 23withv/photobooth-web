export function Footer() {
  return (
    <footer className="relative z-10 w-full py-16 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="w-full h-px bg-linear-to-r from-transparent via-border/50 to-transparent mb-12 opacity-50" />
        <div className="flex flex-col items-center space-y-3">
          <p className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-zinc-500">
            © 2026 <span className="text-primary italic">VibeSnap</span> Booth
          </p>
          <div className="flex items-center gap-4">
            <div className="w-6 h-px bg-zinc-800" />
            <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-zinc-600 uppercase">
              Crafted for aesthetic memories.
            </p>
            <div className="w-6 h-px bg-zinc-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}