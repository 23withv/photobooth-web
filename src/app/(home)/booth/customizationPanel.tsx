"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Sticker } from "lucide-react";

interface CustomizationPanelProps {
  onAddSticker: (url: string) => void;
  onChangeBackground: (color: string) => void;
  fabricCanvas: import("fabric").fabric.Canvas | null;
}

const COLORS = [
  "#ffffff", // Clean White
  "#18181b", // Carbon Black
  "#f3f4f6", // Cool Gray
  "#F5F5DC", // Soft Beige
  "#fecdd3", // Pastel Pink
  "#bbf7d0", // Pastel Rose
  "#bfdbfe", // Pastel Green
  "#bae6fd", // Pastel Blue
  "#fde047", // Pastel Yellow
  "#e9d5ff", // Light Indigo
  "#440808", // Dark Maroon
  "#011632", // Deep Navy
];

const STICKERS = [
  "https://api.iconify.design/fluent-emoji:sparkles.svg",
  "https://api.iconify.design/fluent-emoji:cherry-blossom.svg",
  "https://api.iconify.design/fluent-emoji:cloud-with-lightning-and-rain.svg",
  "https://api.iconify.design/fluent-emoji:heart-decoration.svg",
  "https://api.iconify.design/fluent-emoji:sun-with-face.svg",
  "https://api.iconify.design/fluent-emoji:maple-leaf.svg",
  "https://api.iconify.design/fluent-emoji:alien-monster.svg",
  "https://api.iconify.design/fluent-emoji:ringed-planet.svg",
  "https://api.iconify.design/fluent-emoji:camera-with-flash.svg",
  "https://api.iconify.design/fluent-emoji:party-popper.svg",
  "https://api.iconify.design/fluent-emoji:fire.svg",
  "https://api.iconify.design/fluent-emoji:crown.svg",
];

export function CustomizationPanel({
  onAddSticker,
  onChangeBackground,
}: CustomizationPanelProps) {
  return (
    <div className="w-full relative z-10">
      <Tabs defaultValue="sticker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-950/50 p-1.5 rounded-full mb-8 h-13 border border-white/5 shadow-inner">
          <TabsTrigger
            value="sticker"
            className="rounded-full font-bold text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            <Sticker className="mr-2 h-4 w-4" /> Stickers
          </TabsTrigger>
          <TabsTrigger
            value="color"
            className="rounded-full font-bold text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            <Palette className="mr-2 h-4 w-4" /> Frame Color
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="sticker"
          className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 focus-visible:ring-0 focus-visible:outline-none"
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <Label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              Drag or Click
            </Label>
          </div>

          <div className="grid grid-cols-3 gap-3 pr-2 max-h-80 overflow-y-auto custom-scrollbar">
            {STICKERS.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onAddSticker(url)}
                className="group flex items-center justify-center p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 hover:bg-primary/5 rounded-2xl transition-all hover:scale-105 active:scale-95 aspect-square relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-radial-at-c from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={url}
                  alt="sticker"
                  className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all relative z-10"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="color"
          className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 pt-2 focus-visible:ring-0 focus-visible:outline-none"
        >
          <div className="space-y-3 px-1">
            <Label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              Custom HEX
            </Label>
            <div className="flex items-center gap-3 bg-zinc-950/50 p-2 rounded-2xl border border-white/10 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-inner">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-sm font-bold text-zinc-400">
                #
              </div>
              <Input
                placeholder="FFFFFF"
                className="h-12 flex-1 font-mono uppercase bg-transparent border-0 focus-visible:ring-0 text-xl px-2 shadow-none placeholder:text-zinc-700 tracking-wider text-white"
                maxLength={6}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
                  if (val.length === 3 || val.length === 6) {
                    onChangeBackground(`#${val}`);
                  }
                }}
              />
            </div>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="bg-[#18181b] px-4 text-zinc-500">
                Presets
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 px-1 max-h-45 overflow-y-auto custom-scrollbar">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onChangeBackground(color)}
                className="group relative h-12 w-full rounded-xl border border-white/10 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
              >
                <div
                  className="absolute inset-0 z-0 opacity-20"
                  style={{
                    backgroundImage:
                      "conic-gradient(#ccc 25%, white 25%, white 50%, #ccc 50%, #ccc 75%, white 75%, white 100%)",
                    backgroundSize: "10px 10px",
                  }}
                />
                <div
                  className="absolute inset-0 z-10 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute inset-0 z-20 border-2 border-transparent group-hover:border-black/20 mix-blend-overlay rounded-xl" />
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
