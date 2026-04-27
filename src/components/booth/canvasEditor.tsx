"use client";

import { useCanvasEditor } from "@/hooks/useCanvasEditor";
import { useBoothStore } from "@/store/useBoothStore";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { CustomizationPanel } from "./customizationPanel";

export function CanvasEditor() {
  const { capturedPhotos, layoutType, clearPhotos, setStep } = useBoothStore();
  const { canvasRef, fabricCanvas, addSticker, changeBackgroundColor, canvasHeight } = useCanvasEditor(
    capturedPhotos,
    layoutType
  );

  const handleRetake = () => {
    clearPhotos();
    setStep(2); 
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();

    const dataURL = fabricCanvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 1 
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
    <div className="flex flex-col md:flex-row items-start gap-8 w-full justify-center max-w-5xl animate-in fade-in zoom-in-95 duration-500">     
      <div className="flex flex-col gap-4 w-full md:w-auto items-center">
        <div className="w-full max-w-sm md:max-w-md flex justify-center">
          <div 
            className="w-full relative shadow-md bg-white overflow-hidden"
            style={{ aspectRatio: `1080 / ${canvasHeight}` }}
          >
            <div className="absolute inset-0 [&_.canvas-container]:w-full! [&_.canvas-container]:h-full! [&_canvas]:w-full! [&_canvas]:h-full!">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-sm md:max-w-md">
          <Button variant="outline" onClick={handleRetake} className="flex-1 cursor-pointer">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Ulang Foto
          </Button>
          <Button onClick={handleDownload} className="flex-1 font-semibol cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Unduh Hasil
          </Button>
        </div>
      </div>

      <div className="w-full md:w-87.5">
        <CustomizationPanel
          onAddSticker={addSticker}
          onChangeBackground={changeBackgroundColor}
          fabricCanvas={fabricCanvas}
        />
      </div>
    </div>
  );
}