"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import {
  Download,
  Sparkles,
  ImageIcon,
  Film,
  Clapperboard,
  CheckCircle2,
  ArrowRight,
  FileText,
} from "lucide-react";

export function ResultStep() {
  const { finalPhotoUrl, finalGifUrl, finalRawGifUrl, setStep, clearPhotos } =
    useBoothStore();

  const handleDownload = async (
    url: string | null,
    format: "JPG" | "PNG" | "PDF" | "GIF",
  ) => {
    if (!url) return;

    const fileName = `VibeSnap_${new Date().getTime()}`;

    if (format === "PDF") {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "l" : "p",
          unit: "px",
          format: [img.width, img.height],
        });
        pdf.addImage(url, "JPEG", 0, 0, img.width, img.height);
        pdf.save(`${fileName}.pdf`);
      };
      return;
    }

    if (format === "JPG" || format === "PNG") {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const mimeType = format === "JPG" ? "image/jpeg" : "image/png";
          const quality = format === "JPG" ? 0.9 : 1.0;
          const dataUrl = canvas.toDataURL(mimeType, quality);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${fileName}.${format.toLowerCase()}`;
          link.click();
        }
      };
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.gif`;
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
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mx-auto">
          <CheckCircle2 className="w-3 h-3" /> Ready to Save
        </div>

        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight flex items-center justify-center gap-4">
          All <span className="text-primary italic">Done.</span>
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <ImageIcon size={14} /> Photo Prints
          </div>
          <div className="flex flex-col gap-3 w-full mb-6">
            <div className="flex gap-3">
              <Button
                onClick={() => handleDownload(finalPhotoUrl, "JPG")}
                className="flex-1 h-14 rounded-2xl font-bold bg-white text-black hover:bg-zinc-200 shadow-lg hover:-translate-y-1 transition-all text-xs cursor-pointer"
              >
                JPG
              </Button>

              <Button
                onClick={() => handleDownload(finalPhotoUrl, "PNG")}
                className="flex-1 h-14 rounded-2xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 shadow-lg hover:-translate-y-1 transition-all text-xs cursor-pointer"
              >
                PNG
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => handleDownload(finalPhotoUrl, "PDF")}
              className="w-full h-14 rounded-2xl font-bold border-zinc-700 text-white hover:bg-zinc-800 shadow-lg hover:-translate-y-1 transition-all text-xs cursor-pointer"
            >
              <FileText className="mr-2 h-5 w-5" /> Download PDF
            </Button>
          </div>
          <div className="w-full  overflow-hidden border border-zinc-800">
            <img src={finalPhotoUrl} alt="Preview" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-primary/20 p-6 rounded-[2.5rem] shadow-2xl relative">
          <div className="flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Film size={14} /> Framed GIF
          </div>
          <Button
            onClick={() => handleDownload(finalGifUrl, "GIF")}
            className="w-full h-14 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:-translate-y-1 transition-all mb-6 cursor-pointer"
          >
            <Download className="mr-2 h-5 w-5" /> Save GIF
          </Button>
          <div className="w-full  overflow-hidden border border-zinc-800">
            <img
              src={finalGifUrl}
              alt="GIF Preview"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Clapperboard size={14} /> Quick Loop
          </div>
          <Button
            onClick={() => handleDownload(finalRawGifUrl, "GIF")}
            variant="outline"
            className="w-full h-14 rounded-2xl font-bold border-zinc-700 text-white hover:bg-zinc-800 shadow-lg hover:-translate-y-1 transition-all mb-6 cursor-pointer"
          >
            <Download className="mr-2 h-5 w-5" /> Save Raw GIF
          </Button>
          <div className="w-full  overflow-hidden border border-zinc-800">
            <img
              src={finalRawGifUrl}
              alt="Raw Preview"
              className="w-full h-auto"
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
    </div>
  );
}
