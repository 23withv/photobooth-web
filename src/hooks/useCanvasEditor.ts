"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";
import { toast } from "sonner";

export const useCanvasEditor = ( photos: string[], layoutType: FrameLayout | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<import("fabric").fabric.Canvas | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(1080);
  const { backgroundColor, setBackgroundColor } = useBoothStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    let isMounted = true;
    let canvasInstance: import("fabric").fabric.Canvas | null = null;
    let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;

    import("fabric").then(({ fabric }) => {
      if (!isMounted || !canvasRef.current) return;

      canvasInstance = new fabric.Canvas(canvasRef.current, {
        width: 1080,
        height: 1080,
        backgroundColor: backgroundColor,
        preserveObjectStacking: true,
      });

      handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          const activeObjects = canvasInstance?.getActiveObjects();
          if (activeObjects && activeObjects.length > 0) {
            const activeTag = document.activeElement?.tagName;
            if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
              const isEditingText = activeObjects.some((obj) => {
                if (obj instanceof fabric.IText) {
                  return obj.isEditing;
                }
                return false;
              });
              if (!isEditingText) {
                canvasInstance?.discardActiveObject();
                canvasInstance?.remove(...activeObjects);
                canvasInstance?.requestRenderAll();
              }
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      setFabricCanvas(canvasInstance);
    });

    return () => {
      isMounted = false;
      if (handleKeyDown) window.removeEventListener("keydown", handleKeyDown);
      if (canvasInstance) {
        canvasInstance.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas || photos.length === 0 || !layoutType) return;

    import("fabric").then(({ fabric }) => {
      fabricCanvas.clear();
      const currentBg = useBoothStore.getState().backgroundColor;
      fabricCanvas.backgroundColor = currentBg;

      let cols = 1;
      let rows = 1;

      switch (layoutType) {
        case "1-grid": cols = 1; rows = 1; break;
        case "2-grid": cols = 1; rows = 2; break;
        case "2-strip": cols = 2; rows = 1; break;
        case "3-strip": cols = 1; rows = 3; break;
        case "4-strip": cols = 1; rows = 4; break;
        case "4-grid": cols = 2; rows = 2; break;
        case "6-grid": cols = 2; rows = 3; break;
        case "9-grid": cols = 3; rows = 3; break;
      }

      const canvasWidth = 1080;
      const padding = 40;
      const spacing = 40;
      const bottomTextSpace = 120;

      const photoWidth = (canvasWidth - padding * 2 - spacing * (cols - 1)) / cols;
      const photoHeight = photoWidth * (3 / 4);
      const finalHeight = padding + rows * photoHeight + spacing * (rows - 1) + bottomTextSpace;

      fabricCanvas.setDimensions({ width: canvasWidth, height: finalHeight });
      fabricCanvas.setDimensions({ width: "100%", height: "100%" }, { cssOnly: true });
      setCanvasHeight(finalHeight);

      setTimeout(() => {
        fabricCanvas.calcOffset();
      }, 100);

      Promise.all(
        photos.map((photoUrl) => {
          return new Promise<import("fabric").fabric.Image>((resolve, reject) => {
            fabric.Image.fromURL(photoUrl, (img) => {
              if (img) resolve(img);
              else reject(new Error("Failed to load image"));
            }, { crossOrigin: "anonymous" });
          });
        }),
      ).then((images) => {
        images.forEach((img, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const x = padding + col * (photoWidth + spacing);
          const y = padding + row * (photoHeight + spacing);

          const scale = Math.max(photoWidth / img.width!, photoHeight / img.height!);
          img.scale(scale);

          const clipRect = new fabric.Rect({
            left: x,
            top: y,
            width: photoWidth,
            height: photoHeight,
            absolutePositioned: true,
          });

          img.set({
            left: x,
            top: y,
            selectable: false,
            evented: false,
            clipPath: clipRect,
            originX: "left",
            originY: "top",
            hasControls: false,
          });

          fabricCanvas.add(img);
        });

        const watermark = new fabric.Text("VIBESNAP 2026", {
          left: canvasWidth - padding,
          top: finalHeight - 50,
          fontSize: 20,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          charSpacing: 100,
          fill: getContrastColor(currentBg),
          originX: "right",
          selectable: false,
          evented: false,
          opacity: 0.8,
        });

        fabricCanvas.add(watermark);
        fabricCanvas.renderAll();
      });
    });
  }, [fabricCanvas, photos, layoutType, backgroundColor]);

  const getContrastColor = (hexColor: string): string => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq > 128 ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)";
  };

  const addSticker = useCallback(
    async (stickerUrl: string): Promise<void> => {
      if (!fabricCanvas) return;

      const currentStickers = fabricCanvas.getObjects().filter(obj => {
        const stickerObj = obj as fabric.Object & { isSticker?: boolean };
        return obj.type === 'image' && stickerObj.isSticker === true;
      });

      if (currentStickers.length >= 20) {
        toast.error("Tidak dapat menambah stiker", {
          description: "Anda hanya bisa menambahkan hingga 20 stiker per frame",
        });
        return;
      }
      
      const { fabric } = await import("fabric");

      fabric.Image.fromURL(stickerUrl, (img) => {
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width!, maxSize / img.height!);

        img.set({
          left: fabricCanvas.getWidth() / 2,
          top: fabricCanvas.getHeight() / 2,
          originX: "center",
          originY: "center",
          scaleX: scale,
          scaleY: scale,
          
          selectable: true,
          evented: true,
          hasControls: true,
          transparentCorners: false,
          cornerColor: "#3b82f6",
          cornerStyle: "circle",
          cornerSize: 12,
          padding: 10,
        }); (img as fabric.Image & { isSticker: boolean }).isSticker = true;

        fabricCanvas.add(img);
        img.bringToFront();
        fabricCanvas.setActiveObject(img);
        fabricCanvas.requestRenderAll();
      }, { crossOrigin: "anonymous" });
    },
    [fabricCanvas],
  );

  const changeBackgroundColor = useCallback(
    (color: string): void => {
      if (!fabricCanvas || color === backgroundColor) return;
      setBackgroundColor(color);
      fabricCanvas.backgroundColor = color;
      fabricCanvas.renderAll();
    },
    [fabricCanvas, backgroundColor, setBackgroundColor],
  );

  return {
    canvasRef,
    fabricCanvas,
    addSticker,
    changeBackgroundColor,
    canvasHeight,
  };
};