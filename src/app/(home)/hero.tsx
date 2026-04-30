"use client";

import { Button } from "@/components/ui/button";
import { useBoothStore } from "@/store/useBoothStore";
import { CardStack } from "./cardStack";
import LiquidEther from "../../components/shared/liquidEther";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  LayoutTemplate,
  MonitorPlay,
  Sticker,
  Film,
  Download,
} from "lucide-react";

const HERO_CARDS = [
  {
    id: 1,
    title: "Vivid Filters",
    subtitle: "Noir, Cyber, & Vintage styles",
    icon: Wand2,
    bg: "bg-zinc-900/60",
    accent: "text-purple-400",
    decoration: (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
      </div>
    ),
  },
  {
    id: 2,
    title: "Custom Frames",
    subtitle: "Pick colors & grid layouts",
    icon: LayoutTemplate,
    bg: "bg-zinc-800/60",
    accent: "text-emerald-400",
    decoration: (
      <div className="absolute bottom-10 right-8 flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 rounded-md border border-white/20 bg-white/5" />
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: "Live Session",
    subtitle: "Real-time camera preview",
    icon: MonitorPlay,
    bg: "bg-zinc-900/60",
    accent: "text-red-400",
    decoration: (
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
        <span className="text-[10px] font-black text-red-500 tracking-widest">LIVE</span>
      </div>
    ),
  },
  {
    id: 4,
    title: "Cute Stickers",
    subtitle: "Drag & drop aesthetic emojis",
    icon: Sticker,
    bg: "bg-zinc-800/60",
    accent: "text-yellow-400",
    decoration: (
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 right-12 text-4xl opacity-40"
      >
        ✨
      </motion.div>
    ),
  },
  {
    id: 5,
    title: "Animated GIFs",
    subtitle: "4-frame loop animation",
    icon: Film,
    bg: "bg-zinc-900/60",
    accent: "text-blue-400",
    decoration: (
      <div className="absolute inset-x-0 bottom-16 flex justify-center opacity-30">
        <div className="w-full h-px bg-linear-to-r from-transparent via-white to-transparent" />
      </div>
    ),
  },
  {
    id: 6,
    title: "High-Res Export",
    subtitle: "Download JPG & GIF for free",
    icon: Download,
    bg: "bg-zinc-800/60",
    accent: "text-pink-400",
    decoration: (
      <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary/20 rounded-full blur-3xl" />
    ),
  },
];

export function Hero() {
  const setStep = useBoothStore((state) => state.setStep);

  return (
    <section className="relative w-full min-h-150 flex flex-col-reverse lg:flex-row items-center justify-between pt-24 md:pt-32 pb-12 gap-16 lg:gap-8">
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-60 pointer-events-none">
          <LiquidEther
            className="w-full h-full"
            colors={["#FF3D77", "#AD33FF", "#FFAA47"]}
            mouseForce={15}
            cursorSize={120}
            isViscous={true}
            viscous={30}
            resolution={0.3}
            autoDemo={true}
            autoSpeed={1.2}
            autoIntensity={3}
            autoResumeDelay={0}
            iterationsPoisson={16}
            iterationsViscous={16}
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
            className="group relative overflow-hidden rounded-full px-10 h-16 text-lg font-bold shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            onClick={() => setStep(1)}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Session
              <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-primary via-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex justify-center w-full lg:pl-12">
        <div className="flex items-center gap-8">
          <span
            className="hidden xl:block text-muted-foreground/30 text-[10px] font-black tracking-[0.5em] uppercase rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            ← Swipe to explore features
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <CardStack
              cardsData={HERO_CARDS}
              autoplay={true}
              randomRotation={true}
              autoplayDelay={4500}
              pauseOnHover={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}