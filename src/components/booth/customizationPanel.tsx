"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type, Palette } from "lucide-react";

interface CustomizationPanelProps {
  onAddText: (text: string) => void;
  onChangeBackground: (color: string) => void;
}

const COLORS = ["#ffffff", "#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#1f2937"];

export function CustomizationPanel({ onAddText, onChangeBackground }: CustomizationPanelProps) {
  const [textInput, setTextInput] = useState("");

  const handleAddText = () => {
    if (textInput.trim() === "") return;
    onAddText(textInput);
    setTextInput(""); 
  };

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-sm">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text"><Type className="mr-2 h-4 w-4"/> Teks</TabsTrigger>
          <TabsTrigger value="color"><Palette className="mr-2 h-4 w-4"/> Warna</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="custom-text">Tambah Nama / Caption</Label>
            <div className="flex gap-2">
              <Input 
                id="custom-text" 
                placeholder="VibeSnap 2026..." 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
              />
              <Button onClick={handleAddText}>Tambah</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-4 pt-4">
          <Label>Warna Frame Dasar</Label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onChangeBackground(color)}
                className="h-10 w-10 rounded-full border shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
                aria-label={`Ubah warna ke ${color}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}