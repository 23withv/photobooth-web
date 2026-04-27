"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Sticker} from "lucide-react";

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
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-sm">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {" "}
          <TabsTrigger value="sticker">
            <Sticker className="mr-2 h-4 w-4" /> Stiker
          </TabsTrigger>
          <TabsTrigger value="color">
            <Palette className="mr-2 h-4 w-4" /> Warna
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sticker" className="space-y-4 pt-4">
          <Label>Pilih Stiker Estetik</Label>
          <div className="grid grid-cols-3 gap-3">
            {STICKERS.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onAddSticker(url)}
                className="flex items-center justify-center p-2 border rounded-lg hover:bg-muted transition-colors aspect-square"
              >
                <img
                  src={url}
                  alt="sticker"
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Input Kode HEX</Label>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-xs font-bold text-muted-foreground">
                  #
                </div>
                <Input
                  placeholder="FFFFFF"
                  className="h-10 flex-1 font-mono uppercase"
                  maxLength={6}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length === 3 || val.length === 6) {
                      onChangeBackground(`#${val}`);
                    }
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                *Gunakan kode tanpa tanda #
              </p>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Pilihan Cepat
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onChangeBackground(color)}
                  className="h-9 w-9 rounded-full border shadow-sm transition-transform hover:scale-110 active:scale-95"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
