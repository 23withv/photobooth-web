"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Palette,
  Camera,
  Eye,
  Wand2,
  Download,
  ChevronDown,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Select Layout",
    description:
      "Choose your preferred grid arrangement and frame style. Pick a classic portrait or a vintage film strip to start your session.",
    icon: Palette,
    color: "from-purple-500/20 to-blue-500/20",
  },
  {
    id: "02",
    title: "Strike a Pose",
    description:
      "Follow the automated countdown and look your best. Our real-time filters ensure studio-quality lighting in every shot.",
    icon: Camera,
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: "03",
    title: "Review Shots",
    description:
      "Check your captures instantly. Not happy with a specific frame? Retake individual shots until they are absolutely flawless.",
    icon: Eye,
    color: "from-orange-500/20 to-pink-500/20",
  },
  {
    id: "04",
    title: "Final Touch",
    description:
      "Personalize your memories with exclusive stickers and custom frame colors. Make every photo strip uniquely yours.",
    icon: Wand2,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "05",
    title: "Instant Results",
    description:
      "Your high-quality photos and animated GIFs are ready. Download them to your device and share your vibe with the world.",
    icon: Download,
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="w-full relative py-24 overflow-visible"
    >
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute bottom-0 w-full h-px bg-border/40" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
            Step-by-step
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Ready in{" "}
            <span className="text-primary italic">5 Simple Steps.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Everything happens directly in your browser. No professional gear
            needed—just your vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "group cursor-pointer rounded-[2rem] border transition-all duration-500 overflow-hidden",
                    isActive
                      ? "bg-zinc-900/50 border-white/10 shadow-2xl shadow-primary/5"
                      : "bg-transparent border-transparent hover:bg-white/5",
                  )}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span
                          className={cn(
                            "text-2xl font-black transition-colors duration-500",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground/30",
                          )}
                        >
                          {step.id}
                        </span>
                        <h3
                          className={cn(
                            "text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        className={cn(
                          "text-muted-foreground/40",
                          isActive && "text-primary",
                        )}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="pt-6 flex flex-col gap-4">
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {step.description}
                            </p>
                            <div className="flex gap-2 items-center text-primary text-sm font-bold tracking-wider uppercase">
                              <step.icon className="w-5 h-5" />
                              <span>Premium Feature</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-square w-full hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "w-full h-full rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden relative flex items-center justify-center bg-linear-to-br",
                  STEPS[activeStep].color,
                )}
              >
                <div className="text-center space-y-4">
                  <div className="p-6 bg-white/5 backdrop-blur-3xl rounded-full inline-block border border-white/10 mb-4">
                    {(() => {
                      const Icon = STEPS[activeStep].icon;
                      return (
                        <Icon
                          className="w-16 h-16 text-primary"
                          strokeWidth={1.5}
                        />
                      );
                    })()}
                  </div>
                  <h4 className="text-2xl font-black tracking-tight">
                    {STEPS[activeStep].title}
                  </h4>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i === activeStep + 1 ? "bg-primary" : "bg-white/10",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
