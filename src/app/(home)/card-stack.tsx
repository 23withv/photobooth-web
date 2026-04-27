"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Camera, Image as ImageIcon } from "lucide-react";

const CARDS = [
  {
    id: 1,
    title: "Premium Filters",
    icon: Sparkles,
    bg: "bg-zinc-900 text-white",
  },
  {
    id: 2,
    title: "Aesthetic Frames",
    icon: ImageIcon,
    bg: "bg-zinc-800 text-zinc-100",
  },
  {
    id: 3,
    title: "High-Res Capture",
    icon: Camera,
    bg: "bg-zinc-700 text-zinc-200",
  },
];

const SWIPE_THRESHOLD = 100;

export function CardStack() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [dragOffset, setDragOffset] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [cyclePhase, setCyclePhase] = useState<null | "flyOut" | "entering">(
    null,
  );
  const dragStart = useRef({ x: 0 });

  const totalCards = CARDS.length;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (cyclePhase) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset({ x: e.clientX - dragStart.current.x });
  };

  const cycle = (startX: number) => {
    setCyclePhase("flyOut");
    setDragOffset({ x: startX < 0 ? startX - 250 : startX + 250 });

    setTimeout(() => {
      setCyclePhase("entering");
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setDragOffset({ x: 0 });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCyclePhase(null);
        });
      });
    }, 300);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      cycle(dragOffset.x);
    } else {
      setDragOffset({ x: 0 });
    }
  };

  return (
    <div className="relative h-95 w-70 md:h-112.5 md:w-[320px] mx-auto perspective-1000">
      {order.map((cardIdx, stackPosition) => {
        const card = CARDS[cardIdx];
        const isTopCard = stackPosition === 0;
        const zIndex = totalCards - stackPosition;
        const translateStep = 16;
        const translate = stackPosition * translateStep;
        const scaleStep = 0.06;
        const scale = 1 - stackPosition * scaleStep;
        const rotationStep = 2;
        const rotation = -(stackPosition * rotationStep);
        const dragProgress = Math.min(
          Math.abs(dragOffset.x) / SWIPE_THRESHOLD,
          1,
        );
        const staggerDelay = stackPosition * 0.15;
        const staggerProgress = Math.max(
          0,
          Math.min((dragProgress - staggerDelay) / (1 - staggerDelay), 1),
        );

        let currentX = translate;
        if (isDragging || cyclePhase === "flyOut") {
          if (isTopCard) {
            currentX = dragOffset.x;
          } else {
            currentX = translate + dragOffset.x * staggerProgress * 0.4;
          }
        }

        return (
          <div
            key={card.id}
            onPointerDown={isTopCard ? handlePointerDown : undefined}
            onPointerMove={isTopCard ? handlePointerMove : undefined}
            onPointerUp={isTopCard ? handlePointerUp : undefined}
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] shadow-2xl border border-white/10 select-none touch-none",
              card.bg,
              isTopCard ? "cursor-grab active:cursor-grabbing" : "",
              cyclePhase === "flyOut" && isTopCard
                ? "transition-all duration-300 ease-out opacity-0"
                : "",
              cyclePhase === "entering" && !isTopCard ? "transition-none" : "",
              !isDragging && !cyclePhase
                ? "transition-all duration-500 ease-out"
                : "",
            )}
            style={{
              zIndex,
              transform: `translateX(${currentX}px) scale(${scale}) rotate(${isTopCard && isDragging ? dragOffset.x * 0.04 : rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <card.icon
              className="w-20 h-20 mb-6 opacity-80"
              strokeWidth={1.5}
            />
            <h3 className="text-2xl font-bold tracking-tight">{card.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
