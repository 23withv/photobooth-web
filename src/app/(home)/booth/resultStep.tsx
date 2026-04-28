"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import {
  Download,
  Home,
  Sparkles,
  Image as ImageIcon,
  Film,
  Clapperboard,
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

  const handleBackToHome = () => {
    clearPhotos();
    setStep(1);
  };

  if (!finalPhotoUrl || !finalGifUrl || !finalRawGifUrl) return null;

  return (
    <div className="flex flex-col items-center w-full py-8 md:py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative w-full flex flex-col items-center mb-12 md:mb-20 -mt-8 md:-mt-10">
        <div className="w-full md:absolute left-0 top-0 flex justify-start mb-8 md:mb-0">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="group h-12 px-0 hover:bg-transparent cursor-pointer transition-all"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 group-hover:bg-primary/10 mr-3 transition-all group-hover:scale-110">
              <Home className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-sm font-bold tracking-tight text-muted-foreground group-hover:text-primary transition-colors">
              Kembali ke Beranda
            </span>
          </Button>
        </div>

        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter flex items-center justify-center gap-4">
            Yeay! <span className="text-primary italic">Selesai.</span>
            <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse" />
          </h2>

          <p className="text-muted-foreground text-base md:text-xl leading-relaxed mx-auto max-w-lg">
            Karya estetikmu sudah siap diunduh. Cek hasil foto strip dan GIF
            animasi kamu di bawah ini.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-bold text-muted-foreground mb-1">
            <ImageIcon size={16} /> Foto + Frame
          </div>
          <Button
            onClick={() => handleDownload(finalPhotoUrl, "JPG")}
            className="w-full max-w-xs h-14 rounded-full font-bold shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <Download className="mr-2 h-5 w-5" /> Unduh JPG
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 border border-zinc-200 dark:border-zinc-800 mt-2">
            <img
              src={finalPhotoUrl}
              alt="Photobooth"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-1">
            <Film size={16} /> GIF (Berbingkai)
          </div>
          <Button
            onClick={() => handleDownload(finalGifUrl, "GIF")}
            className="w-full max-w-xs h-14 rounded-full font-bold shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <Download className="mr-2 h-5 w-5" /> Unduh GIF Bingkai
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 mt-2">
            <img
              src={finalGifUrl}
              alt="GIF Framed"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 px-4 py-2 rounded-full text-sm font-bold mb-1">
            <Clapperboard size={16} /> GIF (Polos)
          </div>
          <Button
            onClick={() => handleDownload(finalRawGifUrl, "GIF")}
            variant="outline"
            className="w-full max-w-xs h-14 rounded-full font-bold shadow-lg border-2 hover:-translate-y-1 cursor-pointer bg-white dark:bg-zinc-950"
          >
            <Download className="mr-2 h-5 w-5" /> Unduh GIF Polos
          </Button>
          <div className="w-full max-w-xs rounded-none overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 border border-zinc-200 dark:border-zinc-800 mt-2">
            <img
              src={finalRawGifUrl}
              alt="GIF Raw"
              className="w-full h-auto object-cover rounded-none block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
