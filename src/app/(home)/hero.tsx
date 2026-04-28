"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore } from "@/store/useBoothStore";
import { CardStack } from "./cardStack";
import LiquidEther from "./liquidEther";
import {
  ArrowRight,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Smile,
  Share2,
  Film,
} from "lucide-react";

const HERO_CARDS = [
  {
    id: 1,
    title: "Premium Filters",
    icon: Sparkles,
    bg: "bg-zinc-900/60 text-white border-white/10 backdrop-blur-xl",
  },
  {
    id: 2,
    title: "Aesthetic Frames",
    icon: ImageIcon,
    bg: "bg-zinc-800/60 text-zinc-100 border-white/10 backdrop-blur-xl",
  },
  {
    id: 3,
    title: "High-Res Capture",
    icon: Camera,
    bg: "bg-zinc-700/60 text-zinc-200 border-white/10 backdrop-blur-xl",
  },
  {
    id: 4,
    title: "Custom Stickers",
    icon: Smile,
    bg: "bg-zinc-800/60 text-white border-white/10 backdrop-blur-xl",
  },
  {
    id: 5,
    title: "Instant Sharing",
    icon: Share2,
    bg: "bg-zinc-900/60 text-zinc-100 border-white/10 backdrop-blur-xl",
  },
  {
    id: 6,
    title: "GIF Animation",
    icon: Film,
    bg: "bg-zinc-700/60 text-white border-white/10 backdrop-blur-xl",
  },
];

export function Hero() {
  const setStep = useBoothStore((state) => state.setStep);

  return (
    <section className="relative w-full min-h-150 flex flex-col-reverse lg:flex-row items-center justify-between pt-24 md:pt-32 pb-12 gap-16 lg:gap-8">
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-60 pointer-events-none">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            mouseForce={20}
            cursorSize={150}
            isViscous={true}
            viscous={45}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.5}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent z-1" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent z-1" />
        <div className="absolute bottom-0 w-full h-px bg-border/40 z-2" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 flex-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
          <Sparkles className="w-3 h-3" /> Digital Photobooth
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-foreground">
          Capture Your <br className="hidden md:block" />
          <span className="text-primary italic">Best Moments.</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
          A high-end photobooth platform featuring aesthetic filters, custom
          stickers, and premium layouts. Experience studio-quality memories
          directly from your browser.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            size="lg"
            className="rounded-full px-10 h-16 text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            onClick={() => setStep(1)}
          >
            Start Your Session
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex justify-center w-full">
        <div className="flex items-center gap-4">
          <span
            className="hidden md:block text-muted-foreground/40 text-[10px] tracking-[0.3em] uppercase rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            ← Swipe to explore
          </span>
          <CardStack
            cardsData={HERO_CARDS}
            autoplay={true}
            randomRotation={true}
          />
        </div>
      </div>
    </section>
  );
}
