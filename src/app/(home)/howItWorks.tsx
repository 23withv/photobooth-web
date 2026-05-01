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
  LayoutTemplate,
  Focus,
  Layers,
  Sparkles,
  ArrowDownToLine,
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

const StepVisual = ({ stepIndex }: { stepIndex: number }) => {
  switch (stepIndex) {
    case 0:
      return (
        <div className="relative flex items-center justify-center gap-6 w-full h-full">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-32 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-2 flex flex-col gap-2 shadow-2xl"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-md" />
            ))}
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="w-24 h-24 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-2 grid grid-cols-2 gap-2 shadow-2xl"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 rounded-md" />
            ))}
          </motion.div>
          <LayoutTemplate className="absolute text-white/10 w-40 h-40 -z-10" />
        </div>
      );
    case 1:
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-48 h-48 border-2 border-dashed border-white/20 rounded-[2.5rem] flex items-center justify-center bg-white/2 backdrop-blur-xs"
          >
            <div className="absolute top-6 right-6 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-white/80 tracking-widest">
                REC
              </span>
            </div>

            <div className="absolute bottom-6 left-6 opacity-20">
              <Focus className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>

            <motion.span
              key="countdown"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="text-7xl font-black text-white drop-shadow-2xl"
            >
              3
            </motion.span>
          </motion.div>
        </div>
      );
    case 2:
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="relative w-32 h-44">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -15, x: -20 }}
              className="absolute inset-0 bg-zinc-800 rounded-xl border border-white/20 shadow-2xl"
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 10, x: 20 }}
              className="absolute inset-0 bg-zinc-700 rounded-xl border border-white/30 shadow-2xl"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-xl border border-white/40 shadow-2xl flex flex-col items-center justify-center p-3 gap-3"
            >
              <div className="w-full flex-1 bg-white/10 rounded-lg flex items-center justify-center">
                <Eye className="w-8 h-8 text-white/50" />
              </div>
              <div className="h-6 w-full bg-primary/20 rounded-md border border-primary/30 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary uppercase tracking-widest">
                  Retake
                </span>
              </div>
            </motion.div>
          </div>
          <Layers className="absolute text-white/10 w-40 h-40 -z-10" />
        </div>
      );
    case 3:
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative w-36 h-48 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl flex flex-col p-3 shadow-2xl"
          >
            <div className="w-full flex-1 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/30 blur-xl rounded-full"
              />
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {["bg-red-400", "bg-blue-400", "bg-yellow-400", "bg-primary"].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${color} border border-white/20`}
                  />
                ),
              )}
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg fill-yellow-400/20" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
              className="absolute -bottom-2 -left-4"
            >
              <div className="text-2xl drop-shadow-lg">✨</div>
            </motion.div>
          </motion.div>
        </div>
      );
    case 4:
      return (
        <div className="relative flex flex-col items-center justify-center w-full h-full gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-20 h-28 bg-white border-4 border-white rounded-sm shadow-2xl flex flex-col gap-1 rotate-[-5deg]">
              <div className="flex-1 bg-zinc-200 rounded-sm" />
              <div className="flex-1 bg-zinc-200 rounded-sm" />
            </div>
            <div className="w-20 h-28 bg-zinc-900 border border-white/20 rounded-lg shadow-2xl flex items-center justify-center rotate-[5deg] overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent" />
              <span className="font-black text-white/50 text-xl tracking-widest">
                GIF
              </span>
            </div>
          </motion.div>
          <motion.button
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-6 py-3 bg-white rounded-full font-bold text-sm text-black flex items-center gap-2 shadow-2xl hover:bg-zinc-200 transition-all active:scale-95"
          >
            <ArrowDownToLine className="w-4 h-4" /> Export Files
          </motion.button>
        </div>
      );
    default:
      return null;
  }
};

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
          <div className="flex flex-col gap-4 w-full">
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

          <div className="hidden lg:flex flex-col items-center justify-center w-full sticky top-32 h-[70vh] max-h-150 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "w-full h-full max-w-125 mx-auto rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col bg-linear-to-br",
                  STEPS[activeStep].color,
                )}
              >
                <div className="flex justify-between items-center w-full p-8 pb-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white">
                      {(() => {
                        const Icon = STEPS[activeStep].icon;
                        return <Icon className="w-5 h-5" strokeWidth={2} />;
                      })()}
                    </div>
                    <span className="font-bold text-white/90 tracking-wide">
                      {STEPS[activeStep].title}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-white/30 tracking-[0.2em]">
                    STEP {STEPS[activeStep].id}
                  </span>
                </div>
                <div className="flex-1 w-full relative z-10 p-8">
                  <StepVisual stepIndex={activeStep} />
                </div>
                <div className="w-full p-8 pt-0 flex justify-center z-20">
                  <div className="flex gap-2.5 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={cn(
                          "w-2 h-2 rounded-full cursor-pointer transition-all duration-300",
                          i === activeStep
                            ? "bg-white w-6"
                            : "bg-white/20 hover:bg-white/40",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/20 blur-[100px] rounded-full pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
