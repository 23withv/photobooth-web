"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { useState, useCallback, useRef } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const oldStream = videoRef.current.srcObject as MediaStream;
        oldStream.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: {
          width: { ideal: 1920 }, 
          height: { ideal: 1080 },
          facingMode: "user",
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
      setError(null);
    } catch (err) {
      setError("Gagal mengakses kamera. Pastikan izin diberikan.");
      console.error("Camera Error:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const oldStream = videoRef.current.srcObject as MediaStream;
      oldStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStream(null);
  }, []); 

  const takePhoto = useCallback((cssFilter: string = 'none') => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const displayWidth = video.videoWidth;
    const displayHeight = video.videoHeight;

    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const isMirrored = useBoothStore.getState().isMirrored;
      if (isMirrored) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);     
      }
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);     
      ctx.filter = cssFilter;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL("image/jpeg", 0.9);
    }
    return null;
  }, []);

  return {
    videoRef,
    startCamera,
    stopCamera,
    takePhoto,
    error,
    isStreamActive: !!stream,
  };
};