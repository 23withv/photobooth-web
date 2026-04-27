"use client";

import { useEffect, useState, useRef } from "react";
import { useCamera } from "@/hooks/useCamera";
import { Button } from "@/components/ui/button";
import { useBoothStore } from "@/store/useBoothStore";
import { Camera, RefreshCw, Upload, Timer, Wand2, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentShot, setCurrentShot] = useState(0);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxPhotos = (() => {
    switch (layoutType) {
      case "1-grid": return 1;
      case "2-grid": case "2-strip": return 2;
      case "3-strip": return 3;
      case "4-grid": case "4-strip": return 4;
      case "6-grid": return 6;
      case "9-grid": return 9;
      default: return 1;
    }
  })();

  useEffect(() => {
    if (mode === "camera") startCamera();
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  const handleStartCapture = async () => {
    setIsCapturing(true);
    setIsMenuExpanded(false);
    clearPhotos();

    for (let i = 0; i < maxPhotos; i++) {
      setCurrentShot(i + 1);
      for (let c = timer; c > 0; c--) {
        setCountdown(c);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCountdown(null);

      const photoData = takePhoto(selectedFilter);
      if (photoData) addCapturedPhoto(photoData);
      if (i < maxPhotos - 1)
        await new Promise((resolve) => setTimeout(resolve, 800));
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
    <div className="flex flex-col items-center w-full max-w-full mx-auto py-2 px-6 md:px-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="relative w-full aspect-3/4 md:aspect-video lg:aspect-21/9 overflow-hidden rounded-[2rem] bg-black border border-border/20 shadow-2xl ring-1 ring-white/5 transform-gpu will-change-transform">
        {mode === "camera" ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{
              transform: "scaleX(-1)",
              filter: selectedFilter,
              backfaceVisibility: "hidden",
            }}
          />
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-zinc-900/50 flex flex-col items-center justify-center gap-6 cursor-pointer group"
          >
            <div className="p-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-all">
              <ImageIcon className="w-16 h-16 text-white/60 group-hover:text-white" />
            </div>
            <div className="text-center text-white">
              <p className="font-semibold text-2xl">Klik untuk memilih file</p>
              <p className="opacity-70">Pilih {maxPhotos} foto dari galeri</p>
            </div>
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

        {isCapturing && (
          <div className="absolute inset-0 z-10 bg-black/20 flex flex-col items-center justify-center transition-all">
            <div className="absolute top-6 right-6 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-sm border border-white/10">
              FOTO {currentShot} / {maxPhotos}
            </div>
            {countdown !== null && (
              <span className="text-[10rem] md:text-[14rem] font-black text-white drop-shadow-[0_0_60px_rgba(0,0,0,1)] animate-pulse">
                {countdown}
              </span>
            )}
          </div>
        )}

        {!isCapturing && (
          <>
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className={cn(
                  "rounded-full px-6 h-10 cursor-pointer pointer-events-auto transition-all duration-300",
                  "bg-black/40 border-white/20 text-white backdrop-blur-md",
                  "hover:bg-white hover:text-black hover:border-white shadow-lg active:scale-95",
                )}
              >
                Kembali
              </Button>

              <div className="flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 pointer-events-auto">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setMode("camera")}
                  className={cn(
                    "rounded-full px-4 md:px-6 font-semibold transition-all text-white",
                    mode === "camera" && "bg-white text-black hover:bg-white",
                  )}
                >
                  <Camera className="w-4 h-4 md:mr-2" />{" "}
                  <span className="hidden md:inline">Kamera</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setMode("upload")}
                  className={cn(
                    "rounded-full px-4 md:px-6 font-semibold transition-all text-white",
                    mode === "upload" && "bg-white text-black hover:bg-white",
                  )}
                >
                  <Upload className="w-4 h-4 md:mr-2" />{" "}
                  <span className="hidden md:inline">Upload</span>
                </Button>
              </div>
            </div>

            {mode === "camera" && (
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-6">
                <div
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-auto",
                    isMenuExpanded
                      ? "opacity-0 scale-50 pointer-events-none"
                      : "opacity-100 scale-100",
                  )}
                >
                  <button
                    onClick={handleStartCapture}
                    disabled={!isStreamActive}
                    className="w-24 h-24 flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-90 transition-all cursor-pointer group"
                  >
                    <Camera className="w-12 h-12 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="relative flex items-center justify-center group pointer-events-auto">
                    <button
                      onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-xl hover:bg-black/80 transition-all cursor-pointer z-30"
                    >
                      {isMenuExpanded ? <ChevronDown /> : <ChevronUp />}
                    </button>

                    {isMenuExpanded && (
                      <div className="absolute left-16 whitespace-nowrap px-4 py-2 bg-black/80 backdrop-blur-md text-white text-sm font-bold rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-white/10 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                        Tutup
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "flex flex-col md:flex-row justify-between items-center gap-4 w-full bg-black/60 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl pointer-events-auto transition-all duration-500",
                      isMenuExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0 pointer-events-none absolute",
                    )}
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full">
                        <div className="px-3">
                          <Timer className="w-4 h-4 text-white/70" />
                        </div>
                        {TIMERS.map((t) => (
                          <Button
                            key={t}
                            size="sm"
                            variant="ghost"
                            onClick={() => setTimer(t)}
                            className={cn(
                              "rounded-full w-9 h-8 text-white",
                              timer === t &&
                                "bg-white text-black hover:bg-white",
                            )}
                          >
                            {t}s
                          </Button>
                        ))}
                      </div>
                      <div className="w-px h-8 bg-white/20 hidden md:block" />
                      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white/10 p-1 rounded-full max-w-37.5 md:max-w-xs">
                        <div className="px-3">
                          <Wand2 className="w-4 h-4 text-white/70" />
                        </div>
                        {FILTERS.map((f) => (
                          <Button
                            key={f.value}
                            size="sm"
                            variant="ghost"
                            onClick={() => setFilter(f.value)}
                            className={cn(
                              "rounded-full px-4 text-white whitespace-nowrap",
                              selectedFilter === f.value &&
                                "bg-white text-black hover:bg-white",
                            )}
                          >
                            {f.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleStartCapture}
                      disabled={!isStreamActive}
                      className="rounded-full w-full md:w-auto px-10 bg-white text-black font-bold hover:bg-zinc-200 cursor-pointer"
                    >
                      Mulai ({maxPhotos})
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {!isStreamActive && !isCapturing && mode === "camera" && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 gap-4">
            <Camera className="w-16 h-16 text-white/20" />
            <Button
              onClick={startCamera}
              variant="outline"
              className="rounded-full border-white/20 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Aktifkan Kamera
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
