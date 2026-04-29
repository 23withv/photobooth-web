"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import {
  Download,
  Sparkles,
  Image as ImageIcon,
  Film,
  Clapperboard,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export function ResultStep() {
  const { finalPhotoUrl, finalGifUrl, finalRawGifUrl, setStep, clearPhotos } =
    useBoothStore();

  const handleDownload = (url: string | null, type: "JPG" | "GIF") => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = `VibeSnap_${type}_${new Date().getTime()}.${type.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewSession = () => {
    clearPhotos();
    setStep(1);
  };

  if (!finalPhotoUrl || !finalGifUrl || !finalRawGifUrl) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700 px-4">
      <div className="relative w-full flex flex-col items-center mb-12">
        <div className="text-center space-y-4 max-w-2xl mt-4 md:mt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mx-auto">
            <CheckCircle2 className="w-3 h-3" /> Last Step
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight flex items-center justify-center gap-4">
            All <span className="text-primary italic">Done.</span>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
          </h2>
          <p className="text-zinc-400 text-lg mx-auto max-w-md">
            Your aesthetic creations are ready. Preview and download your high-quality files below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-12">
        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl group">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <ImageIcon size={14} /> Framed Photo
          </div>
          <Button
            onClick={() => handleDownload(finalPhotoUrl, "JPG")}
            className="w-full h-14 rounded-2xl font-bold bg-white text-black hover:bg-zinc-200 shadow-xl hover:-translate-y-1 transition-all cursor-pointer mb-6"
          >
            <Download className="mr-2 h-5 w-5" /> Download JPG
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 border border-zinc-200 dark:border-zinc-800 mt-2">
            <img
              src={finalPhotoUrl}
              alt="Framed Photo"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>
        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl group relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Film size={14} /> Framed GIF
          </div>
          <Button
            onClick={() => handleDownload(finalGifUrl, "GIF")}
            className="w-full h-14 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all cursor-pointer mb-6"
          >
            <Download className="mr-2 h-5 w-5" /> Download GIF
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 mt-2">
            <img
              src={finalGifUrl}
              alt="Framed GIF"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>
        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl group">
          <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Clapperboard size={14} /> Raw GIF
          </div>
          <Button
            onClick={() => handleDownload(finalRawGifUrl, "GIF")}
            variant="outline"
            className="w-full h-14 rounded-2xl font-bold bg-transparent border-2 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all cursor-pointer mb-6"
          >
            <Download className="mr-2 h-5 w-5" /> Download Raw GIF
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 border border-zinc-200 dark:border-zinc-800 mt-2">
            <img
              src={finalRawGifUrl}
              alt="Raw GIF"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 inset-x-0 flex justify-center px-6 z-40">
        <div className="flex flex-row items-center gap-3 bg-zinc-900/90 backdrop-blur-2xl p-2 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md">
          <Button
            onClick={handleNewSession}
            className="flex-2 h-14 rounded-2xl font-black text-primary-foreground bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            Get New Session
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}