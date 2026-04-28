import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { CustomizationPanel } from "./customizationPanel";
import { useCanvasEditor } from "@/hooks/useCanvasEditor";
import { useBoothStore } from "@/store/useBoothStore";
import gifshot, { GifshotResult } from "gifshot";

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

  const handleRetake = () => {
    clearPhotos();
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
      setStep(4);
    } catch (error) {
      setIsGenerating(false);
      console.error("Gif Error:", error);
      alert("Gagal memproses gambar/GIF.");
    }
  };

  if (capturedPhotos.length === 0) return null;

return (
    <div className="flex flex-col items-center w-full py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2 mb-10 w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          Final <span className="text-primary italic">Touch.</span>{" "}
          <Sparkles className="w-8 h-8 text-primary" />
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Hias foto Anda dengan stiker eksklusif atau ubah warna latar frame
          sebelum diproses.
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
              disabled={isGenerating}
              className="flex-1 cursor-pointer h-14 rounded-full font-semibold border-border/50 hover:bg-muted/50 transition-all"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Ulang Foto
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isGenerating}
              className="flex-1 cursor-pointer h-14 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              )}
              {isGenerating ? "Memproses..." : "Selesai Edit"}
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