"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore } from "@/store/useBoothStore";
import { CardStack } from "./card-stack";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const setStep = useBoothStore((state) => state.setStep);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between w-full pt-16 pb-12 gap-16 lg:gap-8 flex-1">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 flex-1">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          Capture Your <br className="hidden md:block" />
          <span className="text-primary italic">Best Moments.</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-lg">
          A modern photobooth platform with aesthetic filters, custom stickers, and
          premium frame layouts directly from your browser.
        </p>
        <div className="pt-4">
          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-lg font-semibold shadow-xl transition-transform hover:scale-105 group cursor-pointer"
            onClick={() => setStep(1)}
          >
            Start Your Session
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex justify-center w-full">
        <div className="flex items-center gap-4">
          <span
            className="hidden md:block text-muted-foreground text-sm tracking-widest uppercase rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            ← Swipe to explore
          </span>
          <CardStack />
        </div>
      </div>
    </section>
  );
}
