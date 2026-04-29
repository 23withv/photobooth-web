"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, SearchX, AlertCircle } from "lucide-react";
import LiquidEther from "@/components/shared/liquidEther";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-zinc-950 text-foreground flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none">
        <div className="absolute inset-0 opacity-40 dark:opacity-50 scale-110">
          <LiquidEther
            colors={["#FF3D77", "#AD33FF", "#FFAA47"]}
            mouseForce={12}
            cursorSize={100}
            isViscous={true}
            viscous={30}
            resolution={0.4}
            autoDemo={true}
            autoSpeed={0.5}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[25vw] font-black tracking-tighter text-white/2 leading-none">
            404
          </span>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950 z-1" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent to-zinc-950/90 z-1" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative p-7 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <SearchX className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mx-auto">
            <AlertCircle className="w-3.5 h-3.5" /> 404 Error
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
            Page <span className="text-primary italic">Not Found.</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved. 
            Please check the URL or return to the home page.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden rounded-full px-12 h-16 text-xl font-black shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Link href="/">
              <span className="relative z-10 flex items-center gap-3">
                <Home className="w-6 h-6 transition-transform group-hover:scale-110" />
                Back to Home
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary via-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </main>
  );
}