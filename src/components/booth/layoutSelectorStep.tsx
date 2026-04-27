"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";
import { LayoutGrid, Rows3, Rows4, Square, Columns2, Grid3X3, Grip, LucideIcon, Rows2 } from "lucide-react";

interface LayoutOption {
  id: FrameLayout;
  label: string;
  icon: LucideIcon;
}

const LAYOUTS: LayoutOption[] = [
  { id: '1-grid', label: 'Single', icon: Square },
  { id: '2-grid', label: '2 Foto (S)', icon: Rows2 },
  { id: '2-strip', label: '2 Foto (H)', icon: Columns2 },
  { id: '3-strip', label: '3 Foto (S)', icon: Rows3 },
  { id: '4-grid', label: '4 Foto (G)', icon: LayoutGrid },
  { id: '4-strip', label: '4 Foto (S)', icon: Rows4 },
  { id: '6-grid', label: '6 Foto (G)', icon: Grip },
  { id: '9-grid', label: '9 Foto (G)', icon: Grid3X3 },
];

export function LayoutSelectorStep() {
  const setStep = useBoothStore((state) => state.setStep);
  const setLayoutType = useBoothStore((state) => state.setLayoutType);

  const handleSelect = (id: FrameLayout) => {
    setLayoutType(id);
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl gap-6 py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4 mb-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Pilih <span className="text-primary italic">Layout.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Sesuaikan grid frame dengan momen yang ingin Anda abadikan.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {LAYOUTS.map((layout) => {
          const Icon = layout.icon;
          return (
            <button
              key={layout.id}
              onClick={() => handleSelect(layout.id)}
              className="group relative flex flex-col items-center justify-center gap-5 p-6 md:p-8 rounded-[2rem] bg-card border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 rounded-full bg-muted/50 group-hover:bg-background transition-colors duration-300 shadow-sm">
                <Icon 
                  className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" 
                  strokeWidth={1.5} 
                />
              </div>
              
              <span className="font-bold text-base md:text-lg tracking-tight relative z-10">
                {layout.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-10">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => setStep(0)}
          className="rounded-full px-8 h-12 font-semibold hover:bg-muted cursor-pointer"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}