"use client";

import { motion } from "framer-motion";
import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import LiquidEther from "../../components/shared/liquidEther";

export function FinalCTA() {
  const setStep = useBoothStore((state) => state.setStep);

  return (
    <section className="relative w-full pt-20 md:pt-32 pb-0 overflow-visible">
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-70 pointer-events-none scale-110">
          <LiquidEther
            colors={["#FF3D77", "#AD33FF", "#FFAA47"]}
            mouseForce={15}
            cursorSize={120}
            isViscous={true}
            viscous={30}
            resolution={0.4}
            autoDemo={true}
            autoSpeed={0.8}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background z-1" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent to-background/80 z-1" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" /> No Sign-up Required
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-foreground"
        >
          Ready to capture <br />
          <span className="text-primary italic">the vibe?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Join thousands of creators making memories every day. Get
          studio-quality photos in seconds, straight from your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <Button
            size="lg"
            onClick={() => {
              setStep(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative overflow-hidden rounded-full px-12 h-16 text-xl font-black shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Session
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-primary via-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>

          <p className="mt-6 text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
            Free forever • High Resolution • Private
          </p>
        </motion.div>
      </div>
    </section>
  );
}
