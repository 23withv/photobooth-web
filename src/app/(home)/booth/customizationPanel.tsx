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
  "#ffffff", // Putih Bersih
  "#1f2937", // Hitam Karbon (Dark Mode)
  "#F5F5DC", // Soft Beige (Nude)
  "#FFC0CB", // Pastel Pink
  "#B2AC88", // Sage Green
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
];

export function CustomizationPanel({
  onAddSticker,
  onChangeBackground,
}: CustomizationPanelProps) {
  return (
    <div className="w-full relative z-10">
      <Tabs defaultValue="sticker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-full mb-6 h-12">
          <TabsTrigger
            value="sticker"
            className="rounded-full font-semibold text-sm"
          >
            <Sticker className="mr-2 h-4 w-4" /> Stiker
          </TabsTrigger>
          <TabsTrigger
            value="color"
            className="rounded-full font-semibold text-sm"
          >
            <Palette className="mr-2 h-4 w-4" /> Warna Latar
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="sticker"
          className="space-y-4 animate-in fade-in duration-300"
        >
          <Label className="text-muted-foreground ml-2 font-medium">
            Pilih Stiker Estetik
          </Label>
          <div className="grid grid-cols-3 gap-4">
            {STICKERS.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onAddSticker(url)}
                className="flex items-center justify-center p-4 bg-muted/30 border border-transparent hover:border-primary/30 rounded-2xl hover:bg-muted transition-all hover:scale-105 active:scale-95 aspect-square"
              >
                <img
                  src={url}
                  alt="sticker"
                  className="w-full h-full object-contain drop-shadow-sm hover:drop-shadow-md transition-all"
                />
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="color"
          className="space-y-6 animate-in fade-in duration-300 pt-2"
        >
          <div className="space-y-3">
            <Label className="text-muted-foreground ml-2 font-medium">
              Input Kode HEX
            </Label>
            <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border border-border/50 focus-within:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background text-sm font-bold text-muted-foreground shadow-sm">
                #
              </div>
              <Input
                placeholder="FFFFFF"
                className="h-12 flex-1 font-mono uppercase bg-transparent border-0 focus-visible:ring-0 text-lg px-2 shadow-none"
                maxLength={6}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length === 3 || val.length === 6) {
                    onChangeBackground(`#${val}`);
                  }
                }}
              />
            </div>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-semibold tracking-widest">
              <span className="bg-card px-4 text-muted-foreground">
                Pilihan Cepat
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onChangeBackground(color)}
                className="h-12 w-12 rounded-full border-2 border-border/50 shadow-sm transition-all hover:scale-110 active:scale-95 hover:shadow-md ring-2 ring-transparent hover:ring-primary/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
