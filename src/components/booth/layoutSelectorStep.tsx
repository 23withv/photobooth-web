"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";
import { Layout, LayoutGrid, Rows3, Rows4 } from "lucide-react";

const LAYOUTS: { id: FrameLayout; label: string; icon: any }[] = [
  { id: '2-grid', label: '2 Foto (Grid)', icon: Layout },
  { id: '3-strip', label: '3 Foto (Strip)', icon: Rows3 },
  { id: '4-grid', label: '4 Foto (Grid)', icon: LayoutGrid },
  { id: '4-strip', label: '4 Foto (Strip)', icon: Rows4 },
];

export function LayoutSelectorStep() {
  const setStep = useBoothStore((state) => state.setStep);
  const setLayoutType = useBoothStore((state) => state.setLayoutType);

  const handleSelect = (id: FrameLayout) => {
    setLayoutType(id);
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl gap-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Pilih Layout Frame</h2>
        <p className="text-muted-foreground">Pilih tata letak foto yang ingin Anda gunakan</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-4">
        {LAYOUTS.map((layout) => {
          const Icon = layout.icon;
          return (
            <button
              key={layout.id}
              onClick={() => handleSelect(layout.id)}
              className="group flex flex-col items-center justify-center gap-6 p-8 border-2 border-muted hover:border-primary rounded-3xl transition-all hover:shadow-md bg-card"
            >
              <Icon className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
              <span className="font-semibold text-lg">{layout.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-8">
        <Button variant="ghost" onClick={() => setStep(0)}>
          Kembali
        </Button>
      </div>
    </div>
  );
}