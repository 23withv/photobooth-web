"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore } from "@/store/useBoothStore";
import { Camera } from "lucide-react";

export function LandingStep() {
  const setStep = useBoothStore((state) => state.setStep);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
      <div className="bg-primary/10 p-8 rounded-full mb-4">
        <Camera className="w-20 h-20 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">VibeSnap Booth</h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Abadikan momen terbaik Anda dengan berbagai layout estetik dan filter real-time.
      </p>
      <div className="pt-8">
        <Button 
          size="lg" 
          className="rounded-full px-12 py-6 text-xl font-semibold shadow-lg transition-transform hover:scale-105" 
          onClick={() => setStep(1)}
        >
          Mulai Foto
        </Button>
      </div>
    </div>
  );
}