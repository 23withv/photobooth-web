"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";
import { useCamera } from "@/hooks/useCamera";
import { useBoothStore } from "@/store/useBoothStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Timer,
  Wand2,
  Image as ImageIcon,
  ChevronLeft,
  Settings2,
  ChevronRight,
  FlipHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FILTERS = [
  { label: "Normal", value: "none" },
  { label: "Noir", value: "grayscale(100%) contrast(150%) brightness(80%)" },
  { label: "Vintage", value: "sepia(50%) contrast(120%)" },
  { label: "Cold", value: "hue-rotate(180deg) saturate(80%) brightness(110%)" },
  { label: "Warm", value: "sepia(20%) saturate(160%) brightness(100%)" },
  { label: "Dramatic", value: "contrast(150%) saturate(120%) brightness(90%)" },
  { label: "Cyber", value: "hue-rotate(90deg) saturate(150%)" },
];

const TIMERS = [3, 5, 10];

export function CameraPreview() {
  const { videoRef, startCamera, stopCamera, takePhoto, isStreamActive } =
    useCamera();
  const {
    layoutType,
    timer,
    setTimer,
    selectedFilter,
    setFilter,
    addCapturedPhoto,
    setStep,
    clearPhotos,
    retakeIndex,
    isMirrored,
    toggleMirror,
  } = useBoothStore();

  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentShot, setCurrentShot] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const expectedCount = retakeIndex !== null ? 1 : maxPhotos;

    if (files.length !== expectedCount) {
      toast.error(`Exactly ${maxPhotos} photos required`, {
        description: `You selected ${files.length} photos. Please select the correct amount to continue.`,
        position: "top-center",
        duration: 4000,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (retakeIndex === null) clearPhotos();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve) => {
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsDataURL(file);
      });
      if (retakeIndex !== null) {
        useBoothStore.getState().updateCapturedPhoto(retakeIndex, dataUrl);
        useBoothStore.getState().updateCapturedBurst(retakeIndex, [dataUrl]);
      } else {
        addCapturedPhoto(dataUrl);
        useBoothStore.getState().addCapturedBurst([dataUrl]);
      }
    }
    useBoothStore.getState().setRetakeIndex(null);
    setStep(3);
  };

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const maxPhotos = (() => {
    switch (layoutType) {
      case "1-grid": return 1;
      case "2-grid":
      case "2-strip": return 2;
      case "3-strip": return 3;
      case "4-grid":
      case "4-strip": return 4;
      case "6-grid": return 6;
      case "9-grid": return 9;
      default:
        return 1;
    }
  })();

  const handleMouseDown = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollFilter = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 150;
      const targetScroll =
        sliderRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (mode === "camera") startCamera();
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  const handleStartCapture = async () => {
    setIsCapturing(true);
    setShowSettings(false);

    if (retakeIndex === null) clearPhotos();
    const targetCount = retakeIndex !== null ? 1 : maxPhotos;

    for (let i = 0; i < targetCount; i++) {
      setCurrentShot(retakeIndex !== null ? retakeIndex + 1 : i + 1);

      for (let c = timer; c > 0; c--) {
        setCountdown(c);
        await new Promise((r) => setTimeout(r, 1000));
      }
      setCountdown(null);

      const shutter = document.getElementById("shutter-flash");
      if (shutter) {
        shutter.style.opacity = "1";
        setTimeout(() => (shutter.style.opacity = "0"), 100);
      }

      const burstFrames: string[] = [];
      for (let f = 0; f < 8; f++) {
        const frameData = takePhoto(selectedFilter);
        if (frameData) burstFrames.push(frameData);
        if (f === 0 && frameData) {
          if (retakeIndex !== null) {
            useBoothStore
              .getState()
              .updateCapturedPhoto(retakeIndex, frameData);
          } else {
            addCapturedPhoto(frameData);
          }
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      if (burstFrames.length > 0) {
        if (retakeIndex !== null) {
          useBoothStore
            .getState()
            .updateCapturedBurst(retakeIndex, burstFrames);
        } else {
          useBoothStore.getState().addCapturedBurst(burstFrames);
        }
      }
      if (i < targetCount - 1) await new Promise((r) => setTimeout(r, 500));
    }
    setIsCapturing(false);
    stopCamera();
    useBoothStore.getState().setRetakeIndex(null);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700 px-4">
      <div className="relative w-full flex flex-col gap-4">
        <div className="relative w-full aspect-4/3 md:aspect-video overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl group shrink-0">
          <div
            id="shutter-flash"
            className="absolute inset-0 bg-white z-50 opacity-0 transition-opacity duration-100 pointer-events-none"
          />
          {mode === "camera" ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
              style={{ 
                transform: isMirrored ? "scaleX(-1)" : "scaleX(1)", 
                filter: selectedFilter 
              }}
            />
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-900/60 transition-all"
            >
              <div className="p-6 rounded-full bg-white/5 border border-white/10 text-white/40">
                <Upload className="w-10 h-10" />
              </div>
              <p className="font-bold text-lg tracking-tight text-white text-center px-4">
                Select exactly {maxPhotos} photos
              </p>
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

          <div className="hidden md:flex absolute inset-0 pointer-events-none z-10 p-6 flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 border-t-2 border-l-2 border-white/40" />
              <div className="w-10 h-10 border-t-2 border-r-2 border-white/40" />
            </div>
            <div className="flex justify-between items-end">
              <div className="w-10 h-10 border-b-2 border-l-2 border-white/40" />
              <div className="w-10 h-10 border-b-2 border-r-2 border-white/40" />
            </div>
          </div>

          <AnimatePresence>
            {countdown !== null && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <span className="text-[10rem] md:text-[14rem] font-black text-white drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  {countdown}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center w-full z-20 md:absolute md:top-6 md:inset-x-0 md:px-6 pointer-events-none">
          <button
            onClick={() => setStep(1)}
            className={cn(
              "pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md transition-all group cursor-pointer",
              "bg-black/60 border border-white/10 text-white/90",
              "hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]",
            )}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Layout
            </span>
          </button>

          <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isStreamActive ? "bg-red-500 animate-pulse" : "bg-zinc-600",
              )}
            />
            <span className="text-[10px] font-black tracking-widest text-white/90 uppercase">
              {isCapturing
                ? `Frame ${currentShot}/${maxPhotos}`
                : retakeIndex !== null
                  ? `Retaking Frame ${retakeIndex + 1}`
                  : "Ready"}
            </span>
          </div>
        </div>

        {!isCapturing && (
          <div className="flex flex-col items-center w-full gap-4 z-20 md:absolute md:bottom-6 md:inset-x-0 md:px-6 pointer-events-none">
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ y: 10, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 10, opacity: 0, scale: 0.98 }}
                  className="pointer-events-auto w-full max-w-lg bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-widest">
                        <Timer className="w-3.5 h-3.5 text-primary" /> Auto
                        Timer
                      </label>
                      <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                        {TIMERS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimer(t)}
                            className={cn(
                              "flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                              timer === t
                                ? "bg-white text-black shadow-lg scale-[1.02]"
                                : "text-white/40 hover:text-white hover:bg-white/10",
                            )}
                          >
                            {t}s
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 w-full min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                          <Wand2 className="w-3.5 h-3.5 text-primary" /> Grade
                          Filter
                        </label>
                        <div className="flex gap-1">
                          <button
                            onClick={() => scrollFilter("left")}
                            className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => scrollFilter("right")}
                            className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="relative w-full overflow-hidden rounded-xl">
                        <div
                          ref={sliderRef}
                          onMouseDown={handleMouseDown}
                          onMouseLeave={handleMouseLeave}
                          onMouseUp={handleMouseUp}
                          onMouseMove={handleMouseMove}
                          className={cn(
                            "flex flex-nowrap gap-3 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar",
                            isDragging
                              ? "cursor-grabbing snap-none"
                              : "cursor-grab snap-x scroll-smooth",
                          )}
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                            width: "100%",
                          }}
                        >
                          {FILTERS.map((f) => (
                            <button
                              key={f.value}
                              onClick={() => setFilter(f.value)}
                              className={cn(
                                "shrink-0 px-6 py-3 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all snap-start",
                                !isDragging && "snap-start",
                                selectedFilter === f.value
                                  ? "bg-primary border-primary text-primary-foreground shadow-[0_0_25px_-5px_rgba(168,85,247,0.6)] scale-105 z-10"
                                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:bg-zinc-800 cursor-pointer",
                              )}
                            >
                              {f.label}
                            </button>
                          ))}
                          <div className="shrink-0 w-4" />
                        </div>
                        <div className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l from-zinc-950 to-transparent pointer-events-none z-20" />
                        <div className="absolute left-0 top-0 bottom-4 w-4 bg-linear-to-r from-zinc-950 to-transparent pointer-events-none z-20" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-auto flex items-center justify-center gap-3 sm:gap-4 bg-zinc-900/95 backdrop-blur-xl p-2 rounded-[2rem] border border-white/20 shadow-2xl max-w-full">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={cn(
                  "p-3 sm:p-4 rounded-full transition-all group shrink-0 cursor-pointer",
                  showSettings
                    ? "text-primary bg-primary/10"
                    : "text-white/40 hover:text-white",
                )}
              >
                <Settings2 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
              <button
                onClick={toggleMirror}
                className={cn(
                  "flex items-center gap-2 p-3 sm:px-5 sm:py-4 rounded-full transition-all group shrink-0 cursor-pointer text-[10px] sm:text-xs font-bold uppercase tracking-widest",
                  isMirrored
                    ? "text-primary bg-primary/10"
                    : "text-white/40 hover:text-white hover:bg-white/10",
                )}
                title="Flip Camera"
              >
                <FlipHorizontal 
                  className={cn(
                    "w-5 h-5 transition-transform duration-500",
                    isMirrored ? "-scale-x-100" : "scale-x-100"
                  )} 
                />
                <span className="hidden sm:inline">{isMirrored ? "Mirrored" : "Flip"}</span>
              </button>
              <div className="h-8 w-px bg-white/10 shrink-0" />
              <button
                onClick={handleStartCapture}
                disabled={!isStreamActive}
                className="relative flex items-center justify-center group disabled:opacity-50 transition-transform active:scale-95 shrink-0 cursor-pointer"
              >
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md group-hover:bg-primary/50 transition-all" />
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/40 flex items-center justify-center p-1 group-hover:border-primary/50 transition-all">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-xl">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                </div>
              </button>
              <div className="h-8 w-px bg-white/10 shrink-0" />
              <div className="flex gap-1.5 sm:gap-2 px-1 sm:px-2 shrink-0">
                <button
                  onClick={() => setMode("camera")}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-tight shadow-sm cursor-pointer",
                    mode === "camera"
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10",
                  )}
                >
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Camera</span>
                </button>
                <button
                  onClick={() => setMode("upload")}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-tight shadow-sm cursor-pointer",
                    mode === "upload"
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10",
                  )}
                >
                  <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Import</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
