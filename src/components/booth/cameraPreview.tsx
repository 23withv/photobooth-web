"use client";

import { useEffect, useState, useRef } from "react";
import { useCamera } from "@/hooks/useCamera";
import { Button } from "@/components/ui/button";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";
import { Camera, RefreshCw, Upload, Timer, Wand2 } from "lucide-react";

const FILTERS = [
  { label: "Normal", value: "none" },
  { label: "B&W", value: "grayscale(100%)" },
  { label: "Noir", value: "grayscale(100%) contrast(150%) brightness(80%)" },
  { label: "Sepia", value: "sepia(100%)" },
  { label: "Vintage", value: "sepia(50%) contrast(120%)" },
  { label: "Retro", value: "sepia(30%) brightness(110%) saturate(140%)" },
  { label: "Cold", value: "hue-rotate(180deg) saturate(80%) brightness(110%)" },
  { label: "Warm", value: "sepia(20%) saturate(160%) brightness(100%)" },
  { label: "Dramatic", value: "contrast(150%) saturate(120%) brightness(90%)" },
  { label: "Vivid", value: "saturate(180%)" },
  { label: "Soft", value: "blur(0.5px) brightness(110%) contrast(90%)" },
  { label: "Cyber", value: "hue-rotate(90deg) saturate(150%)" },
];

const TIMERS = [3, 5, 10];

export function CameraPreview() {
  const { videoRef, startCamera, stopCamera, takePhoto, isStreamActive } = useCamera();
  const { layoutType, timer, setTimer, selectedFilter, setFilter, addCapturedPhoto, setStep, clearPhotos } = useBoothStore();
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentShot, setCurrentShot] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getMaxPhotos = (layout: FrameLayout | null) => {
    switch (layout) {
      case '1-grid': return 1;
      case '2-grid': return 2;
      case '2-strip': return 2;
      case '3-strip': return 3;
      case '4-grid': return 4;
      case '4-strip': return 4;
      case '6-grid': return 6;
      case '9-grid': return 9;
      default: return 1;
    }
  };

  const maxPhotos = getMaxPhotos(layoutType);

  useEffect(() => {
    if (mode === 'camera') startCamera();
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  const handleStartCapture = async () => {
    setIsCapturing(true);
    clearPhotos();

    for (let i = 0; i < maxPhotos; i++) {
      setCurrentShot(i + 1);
      for (let c = timer; c > 0; c--) {
        setCountdown(c);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCountdown(null);

      const photoData = takePhoto(selectedFilter);
      if (photoData) {
        addCapturedPhoto(photoData);
      }
      if (i < maxPhotos - 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }
    setIsCapturing(false);
    stopCamera();
    setStep(3);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    clearPhotos();
    const filesToProcess = files.slice(0, maxPhotos);

    filesToProcess.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addCapturedPhoto(event.target.result as string);
          if (index === filesToProcess.length - 1) {
            stopCamera();
            setStep(3);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full max-w-3xl animate-in fade-in zoom-in-95 duration-300">
      {!isCapturing && (
        <div className="flex flex-wrap justify-center gap-4 w-full bg-card p-4 rounded-2xl border shadow-sm">
          <div className="flex gap-2 border-r pr-4">
            <Button variant={mode === 'camera' ? 'default' : 'ghost'} onClick={() => setMode('camera')}>
              <Camera className="w-4 h-4 mr-2"/> Kamera
            </Button>
            <Button variant={mode === 'upload' ? 'default' : 'ghost'} onClick={() => setMode('upload')}>
              <Upload className="w-4 h-4 mr-2"/> Upload
            </Button>
          </div>
          
          {mode === 'camera' && (
            <>
              <div className="flex items-center gap-2 border-r pr-4">
                <Timer className="w-4 h-4 text-muted-foreground" />
                {TIMERS.map(t => (
                  <Button key={t} size="sm" variant={timer === t ? 'default' : 'outline'} onClick={() => setTimer(t)}>
                    {t}s
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-75 md:max-w-md overflow-x-auto pb-2 scrollbar-hide">
                <Wand2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex gap-2">
                  {FILTERS.map((f) => (
                    <Button
                      key={f.value}
                      size="sm"
                      variant={selectedFilter === f.value ? "default" : "outline"}
                      onClick={() => setFilter(f.value)}
                      className="whitespace-nowrap"
                    >
                      {f.label}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {mode === 'camera' ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover transition-all duration-300"
            style={{ 
              transform: "scaleX(-1)",
              filter: selectedFilter
            }} 
          />

          {!isStreamActive && !isCapturing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Button onClick={startCamera}>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin-slow" /> Aktifkan Kamera
              </Button>
            </div>
          )}

          {isCapturing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white font-bold drop-shadow-md">
              <span className="absolute top-4 right-6 text-xl bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Foto {currentShot} / {maxPhotos}
              </span>
              {countdown !== null && (
                <span className="text-9xl animate-pulse">{countdown}</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-muted border-2 border-dashed flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <Upload className="w-16 h-16 opacity-50" />
          <p>Pilih {maxPhotos} foto dari perangkat Anda</p>
          <Button onClick={() => fileInputRef.current?.click()}>Jelajahi File</Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleFileUpload} 
          />
        </div>
      )}

      {!isCapturing && (
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={() => setStep(1)} className="cursor-pointer">
            Ganti Layout
          </Button>
          {mode === 'camera' && (
            <Button size="lg" onClick={handleStartCapture} disabled={!isStreamActive} className="rounded-full px-12 text-lg cursor-pointer">
              <Camera className="mr-2 h-5 w-5" />
              Mulai ({maxPhotos} Foto)
            </Button>
          )}
        </div>
      )}
    </div>
  );
}