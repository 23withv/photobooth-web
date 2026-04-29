"use client";

import BorderGlow from "../../components/shared/borderGlow";
import {
  Sparkles,
  LayoutGrid,
  MonitorSmartphone,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Studio-Grade Filters",
    description:
      "Elevate your shots with professionally tuned color grading. Move beyond basic overlays and achieve a cinematic aesthetic in real time.",
    icon: Sparkles,
    colors: ["#5227FF", "#FF9FFC", "#B497CF"],
    glow: "260 100% 65%",
  },
  {
    title: "Dynamic Layouts",
    description:
      "Express your creativity with a wide range of grid options. Choose anywhere from a single bold shot to a 9-photo masterpiece.",
    icon: LayoutGrid,
    colors: ["#38bdf8", "#818cf8", "#c084fc"],
    glow: "200 100% 60%",
  },
  {
    title: "Zero Installation",
    description:
      "No apps. No downloads. Open VibeSnap in your mobile or desktop browser and start capturing instantly.",
    icon: MonitorSmartphone,
    colors: ["#f472b6", "#fb7185", "#c084fc"],
    glow: "330 100% 70%",
  },
  {
    title: "Ultra HD Export",
    description:
      "Don't settle for blurry previews. Save and download your creations in high-resolution formats ready for print or social sharing.",
    icon: Download,
    colors: ["#B497CF", "#e879f9", "#38bdf8"],
    glow: "280 100% 75%",
  },
];

export function KeyFeatures() {
  return (
    <section 
      id="features"
      className="w-full relative py-24 overflow-visible"
    >
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 lg:mask-[linear-gradient(to_bottom,transparent,black_150px,black_calc(100%-150px),transparent)]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase w-fit">
            <Sparkles className="w-3 h-3" /> Core Features
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Why <br className="hidden lg:block" />
            <span className="text-primary italic">VibeSnap?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-sm">
            Everything you need to capture the perfect moment directly in your browser.
          </p>
          <div className="hidden lg:block pt-8">
            <div className="flex items-center gap-3 text-muted-foreground/40 text-xs font-bold tracking-widest uppercase">
              <div className="w-12 h-px bg-border" />
              Scroll to explore
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-8">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="w-full transition-all duration-500">
              <BorderGlow
                edgeSensitivity={40}
                glowColor={feat.glow}
                backgroundColor="transparent"
                borderRadius={32}
                glowRadius={60}
                glowIntensity={1.2}
                colors={feat.colors}
                className="w-full"
              >
                <div className={cn(
                  "relative p-8 md:p-12 min-h-87.5 md:min-h-100 flex flex-col justify-center rounded-[32px] border border-white/10 shadow-2xl overflow-hidden",
                  "bg-[#0f0f13] dark:bg-zinc-900/40 backdrop-blur-2xl" 
                )}>
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
                  <div className="p-4 bg-primary/20 w-fit rounded-2xl border border-primary/30 mb-8 relative z-10">
                    <feat.icon className="w-8 h-8 text-primary" strokeWidth={2} />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground">
                      {feat.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                      {feat.description}
                    </p>
                  </div>
                  <div className="absolute bottom-8 right-12 text-6xl md:text-7xl font-black text-foreground/5 select-none pointer-events-none">
                    0{idx + 1}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}