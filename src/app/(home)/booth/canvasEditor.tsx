"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Sparkles, ArrowRight, Loader2, Paintbrush } from "lucide-react";
import { CustomizationPanel } from "./customizationPanel";
import { useCanvasEditor } from "@/hooks/useCanvasEditor";
import { useBoothStore } from "@/store/useBoothStore";
import gifshot, { GifshotResult } from "gifshot";
import { toast } from "sonner"; 

export function CanvasEditor() {
  const { capturedPhotos, capturedBursts, layoutType, clearPhotos, setStep, setFinalResult } =
    useBoothStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    canvasRef,
    fabricCanvas,
    addSticker,
    changeBackgroundColor,
    canvasHeight,
  } = useCanvasEditor(capturedPhotos, layoutType);

  const handleBack = () => {
    setStep(2);
  };

  const handleFinish = async () => {
    if (!fabricCanvas) return;
    setIsGenerating(true);

    try {
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();

      const photoDataURL = fabricCanvas.toDataURL({
        format: "jpeg",
        quality: 1,
        multiplier: 1,
      });

      const framedGifFrames: string[] = [];
      const photoObjects = fabricCanvas
        .getObjects()
        .filter(
          (obj) => obj.type === "image" && !(obj as any).isSticker,
        ) as import("fabric").fabric.Image[];

      photoObjects.sort(
        (a, b) => (a.top || 0) - (b.top || 0) || (a.left || 0) - (b.left || 0),
      );

      const burstLength = capturedBursts[0]?.length || 1;

      for (let frameIdx = 0; frameIdx < burstLength; frameIdx++) {
        const promises = photoObjects.map((obj, slotIdx) => {
          return new Promise((resolve) => {
            const burst = capturedBursts[slotIdx];
            const frameImg = burst ? burst[frameIdx] : capturedPhotos[slotIdx];
            
            obj.setSrc(frameImg, () => resolve(true), { crossOrigin: "anonymous" });
          });
        });

        await Promise.all(promises);
        fabricCanvas.renderAll();
        framedGifFrames.push(
          fabricCanvas.toDataURL({
            format: "jpeg",
            quality: 1,
            multiplier: 1,
          }),
        );
      }

      const restorePromises = photoObjects.map((obj, j) => {
        return new Promise((resolve) => {
          obj.setSrc(capturedPhotos[j], () => resolve(true), {
            crossOrigin: "anonymous",
          });
        });
      });
      await Promise.all(restorePromises);
      fabricCanvas.renderAll();

      const generateRawGif = new Promise<string>((resolve, reject) => {
        gifshot.createGIF(
          { images: capturedPhotos, interval: 0.6, gifWidth: 800, gifHeight: 600 },
          (obj: GifshotResult) => obj.error ? reject(obj.errorMsg) : resolve(obj.image)
        );
      });

      const generateFramedGif = new Promise<string>((resolve, reject) => {
        gifshot.createGIF(
          { images: framedGifFrames, interval: 0.15, gifWidth: 540, gifHeight: canvasHeight / 2 },
          (obj: GifshotResult) => obj.error ? reject(obj.errorMsg) : resolve(obj.image)
        );
      });

      const [rawGif, framedGif] = await Promise.all([
        generateRawGif,
        generateFramedGif,
      ]);

      setFinalResult(photoDataURL, framedGif, rawGif);
      setIsGenerating(false);
      setStep(5);
    } catch (error) {
      setIsGenerating(false);
      console.error("Gif Error:", error);
      toast.error("Processing Failed", {
        description: "An error occurred while generating the GIF/Image.",
        position: "top-center"
      });
    }
  };

  if (capturedPhotos.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center space-y-4 mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mx-auto">
          <Paintbrush className="w-3 h-3" /> Step 04
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-foreground flex items-center justify-center gap-4">
          Final <span className="text-primary italic">Touch.</span>
          <Sparkles className="w-8 h-8 text-primary" />
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Decorate your memories with exclusive stickers or change the frame color before exporting.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto px-4 md:px-0">
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <div
            className="relative w-full max-w-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            style={{ aspectRatio: `1080 / ${canvasHeight}` }}
          >
            <div className="absolute inset-0 [&_.canvas-container]:w-full! [&_.canvas-container]:h-full! [&_canvas]:w-full! [&_canvas]:h-full!">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
          <div className="flex flex-col gap-6 w-full max-w-105 shrink-0 lg:sticky lg:top-28">
            <div className="flex gap-3 md:gap-4 w-full">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isGenerating}
                className="flex-1 cursor-pointer h-14 rounded-2xl font-bold bg-zinc-900/50 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all shadow-lg"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retake
              </Button>
              <Button
                onClick={handleFinish}
                disabled={isGenerating}
                className="flex-1 cursor-pointer h-14 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Finish & Export
                  </>
                )}
              </Button>
            </div>

            <div className="bg-zinc-900/80 border border-white/10 shadow-2xl rounded-[2.5rem] p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden w-full">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <CustomizationPanel
                  onAddSticker={addSticker}
                  onChangeBackground={changeBackgroundColor}
                  fabricCanvas={fabricCanvas}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}