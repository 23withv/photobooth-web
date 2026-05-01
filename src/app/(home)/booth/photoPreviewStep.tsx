"use client";

import { useState } from "react";
import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  RefreshCcw,
  Maximize2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PhotoPreviewStep() {
  const { capturedPhotos, setStep, clearPhotos, setRetakeIndex } =
    useBoothStore();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  const handleRetakeAll = () => {
    clearPhotos();
    setStep(2);
  };
  const handleRetakeSingle = (index: number) => {
    setRetakeIndex(index);
    setStep(2);
  };
  const handleContinue = () => {
    setStep(4);
  };

  if (capturedPhotos.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mx-auto">
          <ImageIcon className="w-3 h-3" /> Step 03
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-foreground flex items-center justify-center gap-4">
          Review <span className="text-primary italic">Shots.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Check your photos. Retake a specific shot if you blinked, or continue
          to the editor.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full mb-16">
        {capturedPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="relative w-full max-w-70 aspect-3/4 group overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl transition-all"
          >
            <img
              src={photo}
              alt={`Shot ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className={cn(
                "absolute inset-0 flex transition-all duration-300",
                "md:flex-col md:items-center md:justify-center md:opacity-0 md:group-hover:opacity-100 md:bg-black/70 md:backdrop-blur-sm",
                "flex-row items-end justify-center gap-2 p-4 opacity-100 bg-linear-to-t from-black/95 via-black/40 to-transparent md:via-transparent md:to-transparent",
              )}
            >
              <Button
                onClick={() => setSelectedPhotoIndex(idx)}
                variant="outline"
                size="sm"
                className="flex-1 md:flex-none h-11 rounded-full bg-zinc-900/90 border-white/20 text-white backdrop-blur-xl hover:bg-zinc-800 hover:border-white/40 shadow-xl cursor-pointer transition-all duration-300"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                <span className="text-[11px] md:text-sm font-bold">
                  Enlarge
                </span>
              </Button>

              <Button
                onClick={() => handleRetakeSingle(idx)}
                size="sm"
                className="flex-1 md:flex-none h-11 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                <span className="text-[11px] md:text-sm font-bold">Retake</span>
              </Button>
            </div>
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/10">
              #{idx + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center gap-4 w-full max-w-md mt-8">
        <Button
          variant="outline"
          onClick={handleRetakeAll}
          className="flex-1 h-14 rounded-2xl font-bold bg-zinc-900/50 border-white/10 text-white hover:bg-white/10 shadow-lg cursor-pointer transition-all"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Retake All</span>
          <span className="sm:hidden">Retake</span>
        </Button>

        <Button
          onClick={handleContinue}
          className="flex-2 h-14 rounded-2xl font-black text-primary-foreground bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          Continue to Edit
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-3 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] backdrop-blur-md cursor-pointer"
            >
              <X className="w-6 h-6" strokeWidth={3} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={capturedPhotos[selectedPhotoIndex]}
              className="max-w-full max-h-[75vh] rounded-xl shadow-2xl object-contain border border-white/10"
            />

            <div className="mt-8 flex gap-4">
              <Button
                onClick={() => handleRetakeSingle(selectedPhotoIndex)}
                className="h-14 px-8 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <RefreshCcw className="w-5 h-5 mr-2" /> Retake This Shot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
