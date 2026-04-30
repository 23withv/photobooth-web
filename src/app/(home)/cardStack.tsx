"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Camera,
  Image as ImageIcon,
  LucideIcon,
  Sticker,
  Share2,
  Wand2,
  Film,
  Download,
  LayoutTemplate,
  MonitorPlay,
} from "lucide-react";

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bg: string;
  accent: string;
  decoration?: ReactNode;
}

const HERO_CARDS: CardItem[] = [
  {
    id: 1,
    title: "Vivid Filters",
    subtitle: "Noir, Cyber, & Vintage styles",
    icon: Wand2,
    bg: "bg-zinc-900/60",
    accent: "text-purple-400",
    decoration: (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
      </div>
    ),
  },
  {
    id: 2,
    title: "Custom Frames",
    subtitle: "Pick colors & grid layouts",
    icon: LayoutTemplate,
    bg: "bg-zinc-800/60",
    accent: "text-emerald-400",
    decoration: (
      <div className="absolute bottom-10 right-8 flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 rounded-md border border-white/20 bg-white/5" />
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: "Live Session",
    subtitle: "Real-time camera preview",
    icon: MonitorPlay,
    bg: "bg-zinc-900/60",
    accent: "text-red-400",
    decoration: (
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
        <span className="text-[10px] font-black text-red-500 tracking-widest">LIVE</span>
      </div>
    ),
  },
  {
    id: 4,
    title: "Cute Stickers",
    subtitle: "Drag & drop aesthetic emojis",
    icon: Sticker,
    bg: "bg-zinc-800/60",
    accent: "text-yellow-400",
    decoration: (
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 right-12 text-4xl opacity-40 filter grayscale-50"
      >
        ✨
      </motion.div>
    ),
  },
  {
    id: 5,
    title: "Animated GIFs",
    subtitle: "4-frame loop animation",
    icon: Film,
    bg: "bg-zinc-900/60",
    accent: "text-blue-400",
    decoration: (
      <div className="absolute inset-x-0 bottom-16 flex justify-center opacity-30">
        <div className="w-full h-px bg-linear-to-r from-transparent via-white to-transparent" />
      </div>
    ),
  },
  {
    id: 6,
    title: "High-Res Export",
    subtitle: "Download JPG & GIF for free",
    icon: Download,
    bg: "bg-zinc-800/60",
    accent: "text-pink-400",
    decoration: (
      <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary/20 rounded-full blur-3xl" />
    ),
  },
];

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  function handleDragEnd(_: any, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <div className="relative w-full h-full">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, perspective: 1000 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}

export function CardStack({
  randomRotation = false,
  sensitivity = 150,
  sendToBackOnClick = true,
  cardsData = HERO_CARDS,
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 4000,
  pauseOnHover = true,
}: StackProps) {
  const [stack, setStack] = useState<CardItem[]>(cardsData);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    setStack(cardsData);
  }, [cardsData]);

  const sendToBack = (id: number): void => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCard = stack[stack.length - 1];
        sendToBack(topCard.id);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="relative h-96 w-72 md:h-112 md:w-80 mx-auto"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence>
        {stack.map((card, index) => {
          const isTopCard = index === stack.length - 1;
          const randomRot = randomRotation ? (index % 2 === 0 ? 3 : -3) : 0;
          const stackLevel = stack.length - 1 - index;

          if (stackLevel > 3) return null;

          const scale = 1 - stackLevel * 0.06;
          const translateY = stackLevel * -18;

          return (
            <div
              key={card.id}
              className="absolute inset-0"
              style={{ zIndex: index }}
            >
              <CardRotate
                onSendToBack={() => sendToBack(card.id)}
                sensitivity={sensitivity}
                disableDrag={!isTopCard}
              >
                <motion.div
                  className={cn(
                    "relative w-full h-full rounded-[2.5rem] flex flex-col items-start justify-end p-8 border shadow-2xl backdrop-blur-2xl overflow-hidden transition-colors duration-500",
                    card.bg,
                    "border-white/10"
                  )}
                  onClick={() => sendToBackOnClick && isTopCard && sendToBack(card.id)}
                  animate={{
                    y: translateY,
                    scale: scale,
                    rotateZ: isTopCard ? 0 : randomRot,
                    opacity: 1 - stackLevel * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: animationConfig.stiffness,
                    damping: animationConfig.damping,
                  }}
                >
                  {card.decoration}

                  <div className="relative mb-auto group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-700" />
                    <card.icon
                      className={cn("w-14 h-14 relative z-10 drop-shadow-sm", card.accent)}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="text-2xl font-black tracking-tight text-white leading-none mb-2 uppercase">
                      {card.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-bold leading-tight tracking-wide">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="w-full h-1.5 bg-white/5 rounded-full mt-8 relative overflow-hidden">
                    {isTopCard && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-primary/40 to-transparent"
                      />
                    )}
                  </div>
                </motion.div>
              </CardRotate>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cardsData?: CardItem[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function HeroSection() {
  return (
    <section className="w-full py-20 flex items-center justify-center">
      <CardStack
        autoplay={true}
        randomRotation={true}
        autoplayDelay={4000}
      />
    </section>
  );
}