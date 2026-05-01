"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";
import { ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutOption {
  id: FrameLayout;
  label: string;
  gridClass: string;
  boxes: number;
}

const LAYOUTS: LayoutOption[] = [
  { id: "1-grid", label: "Classic Portrait", gridClass: "grid-cols-1", boxes: 1 },
  { id: "2-grid", label: "Duo Stack", gridClass: "grid-cols-1 grid-rows-2", boxes: 2 },
  { id: "2-strip", label: "Cinema Strip", gridClass: "grid-cols-2", boxes: 2 },
  { id: "3-strip", label: "Vintage Triple", gridClass: "grid-cols-1 grid-rows-3", boxes: 3 },
  { id: "4-grid", label: "Modern Quad", gridClass: "grid-cols-2 grid-rows-2", boxes: 4 },
  { id: "4-strip", label: "Vertical Film", gridClass: "grid-cols-1 grid-rows-4", boxes: 4 },
  { id: "6-grid", label: "Story Board", gridClass: "grid-cols-2 grid-rows-3", boxes: 6 },
  { id: "9-grid", label: "Gallery Wall", gridClass: "grid-cols-3 grid-rows-3", boxes: 9 },
];

export function LayoutSelectorStep() {
  const setStep = useBoothStore((state) => state.setStep);
  const setLayoutType = useBoothStore((state) => state.setLayoutType);

  const handleSelect = (id: FrameLayout) => {
    setLayoutType(id);
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto gap-12 py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mx-auto">
          <Sparkles className="w-3 h-3" /> Step 01
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-foreground">
          Pick Your <span className="text-primary italic">Canvas.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Select the perfect arrangement for your session. Each layout is optimized for studio quality.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            onClick={() => handleSelect(layout.id)}
            className={cn(
              "group relative flex flex-col items-center gap-6 p-8 rounded-[2.5rem] transition-all duration-500",
              "bg-zinc-900/40 border border-white/5 hover:border-primary/50 backdrop-blur-xl",
              "hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] hover:-translate-y-2 cursor-pointer"
            )}
          >
            <div className={cn(
              "grid gap-1.5 w-24 h-32 md:w-28 md:h-36 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/5 transition-colors duration-500",
              layout.gridClass
            )}>
              {[...Array(layout.boxes)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-sm group-hover:bg-primary/20 transition-colors duration-500" />
              ))}
            </div>
            <div className="space-y-1 text-center relative z-10">
              <span className="block font-black text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
                {layout.label}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                {layout.boxes} Exposure{layout.boxes > 1 ? 's' : ''}
              </span>
            </div>
            <div className="absolute inset-0 bg-radial-at-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
          </button>
        ))}
      </div>
      <div className="pt-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setStep(0)}
          className="rounded-full px-8 h-14 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all gap-2 group cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}