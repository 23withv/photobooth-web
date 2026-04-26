"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { useBoothStore, FrameLayout } from "@/store/useBoothStore";

export const useCanvasEditor = (photos: string[], layoutType: FrameLayout | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(1080);
  const { backgroundColor, setBackgroundColor } = useBoothStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1080,
      height: 1080,
      backgroundColor: backgroundColor,
      preserveObjectStacking: true,
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas || photos.length === 0 || !layoutType) return;

    fabricCanvas.clear();
    const currentBg = useBoothStore.getState().backgroundColor;
    fabricCanvas.backgroundColor = currentBg;

    let cols = 1;
    let rows = 1;
    
    if (layoutType === '2-grid') { cols = 1; rows = 2; }
    if (layoutType === '3-strip') { cols = 1; rows = 3; }
    if (layoutType === '4-strip') { cols = 1; rows = 4; }
    if (layoutType === '4-grid') { cols = 2; rows = 2; }
    if (layoutType === '9-grid') { cols = 3; rows = 3; }

    const canvasWidth = 1080;
    const padding = 50; 
    const spacing = 30; 
    const bottomTextSpace = 250; 

    const photoWidth = (canvasWidth - (padding * 2) - (spacing * (cols - 1))) / cols;
    const photoHeight = photoWidth * (9 / 16);
    const finalHeight = padding + (rows * photoHeight) + (spacing * (rows - 1)) + bottomTextSpace;

    fabricCanvas.setWidth(canvasWidth);
    fabricCanvas.setHeight(finalHeight);
    setCanvasHeight(finalHeight);

    Promise.all(
      photos.map((photoUrl) => {
        return new Promise<fabric.Image>((resolve) => {
          fabric.Image.fromURL(photoUrl, (img) => {
            resolve(img);
          }, { crossOrigin: 'anonymous' });
        });
      })
    ).then((images) => {
      images.forEach((img, index) => {
        if (!img) return;

        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = padding + col * (photoWidth + spacing);
        const y = padding + row * (photoHeight + spacing);

        img.scaleToWidth(photoWidth);
        img.set({
          left: x,
          top: y,
          selectable: false,
          evented: false,
          originX: 'left',
          originY: 'top',
        });

        fabricCanvas.add(img);
      });
      fabricCanvas.renderAll();
    });

  }, [fabricCanvas, photos, layoutType]);

  const addText = useCallback((text: string) => {
    if (!fabricCanvas) return;
    
    const textObj = new fabric.IText(text, {
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! - 120, 
      fontFamily: 'var(--font-poppins)',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#000000',
      originX: 'center',
      originY: 'center',
    });

    fabricCanvas.add(textObj);
    fabricCanvas.setActiveObject(textObj);
    fabricCanvas.renderAll();
  }, [fabricCanvas]);

  const changeBackgroundColor = useCallback((color: string) => {
    if (!fabricCanvas) return;
    setBackgroundColor(color);
    fabricCanvas.backgroundColor = color;
    fabricCanvas.renderAll();
  }, [fabricCanvas, setBackgroundColor]);

  return { 
    canvasRef, 
    fabricCanvas, 
    addText, 
    changeBackgroundColor,
    canvasHeight
  };
};