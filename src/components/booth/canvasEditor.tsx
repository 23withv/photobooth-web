"use client";

import { useCanvasEditor } from "@/hooks/useCanvasEditor";
import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, Sparkles } from "lucide-react";
import { CustomizationPanel } from "./customizationPanel";

export function CanvasEditor() {
  const { capturedPhotos, layoutType, clearPhotos, setStep } = useBoothStore();
  const {
    canvasRef,
    fabricCanvas,
    addSticker,
    changeBackgroundColor,
    canvasHeight,
  } = useCanvasEditor(capturedPhotos, layoutType);

  const handleRetake = () => {
    clearPhotos();
    setStep(2);
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;

    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();

    const dataURL = fabricCanvas.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `VibeSnap_${layoutType}_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (capturedPhotos.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-full mx-auto py-8 px-6 md:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2 mb-10 w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          Final <span className="text-primary italic">Touch.</span>{" "}
          <Sparkles className="w-8 h-8 text-primary" />
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Hias foto Anda dengan stiker eksklusif atau ubah warna latar frame
          sebelum diunduh.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 w-full">
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-end flex-1">
          <div className="w-full max-w-100 flex justify-center">
            <div
              className="w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-white overflow-hidden rounded-none transition-transform duration-500 hover:scale-[1.02]"
              style={{ aspectRatio: `1080 / ${canvasHeight}` }}
            >
              <div className="absolute inset-0 [&_.canvas-container]:w-full! [&_.canvas-container]:h-full! [&_canvas]:w-full! [&_canvas]:h-full!">
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full max-w-100">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="flex-1 cursor-pointer h-14 rounded-full font-semibold border-border/50 hover:bg-muted/50 transition-all"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Ulang Foto
            </Button>
            <Button
              onClick={handleDownload}
              className="flex-1 cursor-pointer h-14 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Unduh Hasil
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-112.5 shrink-0 sticky top-28">
          <div className="bg-card border border-border/40 shadow-xl rounded-[2rem] p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <CustomizationPanel
              onAddSticker={addSticker}
              onChangeBackground={changeBackgroundColor}
              fabricCanvas={fabricCanvas}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
