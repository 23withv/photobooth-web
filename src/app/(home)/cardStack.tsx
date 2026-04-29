"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "motion/react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Camera,
  Image as ImageIcon,
  LucideIcon,
  Sticker,
  Share2,
  Wand2,
} from "lucide-react";
import "../globals.css";

const HERO_CARDS: CardItem[] = [
  {
    id: 1,
    title: "Premium Filters",
    icon: Sparkles,
    bg: "bg-zinc-900/60 dark:bg-zinc-900/40",
  },
  {
    id: 2,
    title: "Aesthetic Frames",
    icon: ImageIcon,
    bg: "bg-zinc-800/60 dark:bg-zinc-800/40",
  },
  {
    id: 3,
    title: "High-Res Capture",
    icon: Camera,
    bg: "bg-zinc-700/60 dark:bg-zinc-700/40",
  },
  {
    id: 4,
    title: "Custom Stickers",
    icon: Sticker,
    bg: "bg-zinc-900/60 dark:bg-zinc-900/40",
  },
  {
    id: 5,
    title: "Instant Sharing",
    icon: Share2,
    bg: "bg-zinc-800/60 dark:bg-zinc-800/40",
  },
  {
    id: 6,
    title: "AI Enhancement",
    icon: Wand2,
    bg: "bg-zinc-700/60 dark:bg-zinc-700/40",
  },
];

interface CardItem {
  id: number;
  title: string;
  icon: LucideIcon;
  bg: string;
}

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
  const rotateX = useTransform(y, [-100, 100], [25, -25]);
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

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
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export function CardStack({
  randomRotation = false,
  sensitivity = 150,
  sendToBackOnClick = true,
  cardsData,
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
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
      className="relative h-95 w-70 md:h-112.5 md:w-[320px] mx-auto"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="stack-container">
        <AnimatePresence>
          {stack.map((card, index) => {
            const isTopCard = index === stack.length - 1;
            const randomRot = randomRotation ? Math.random() * 6 - 3 : 0;
            const stackLevel = stack.length - 1 - index;

            if (stackLevel > 3) return null;

            const scale = 1 - stackLevel * 0.05;
            const translateY = stackLevel * -16;

            return (
              <CardRotate
                key={card.id}
                onSendToBack={() => sendToBack(card.id)}
                sensitivity={sensitivity}
                disableDrag={!isTopCard}
              >
                <motion.div
                  className={cn(
                    "stack-card-wrapper rounded-[2rem] flex flex-col items-center justify-center p-6 border shadow-2xl",
                    card.bg,
                  )}
                  onClick={() =>
                    sendToBackOnClick && isTopCard && sendToBack(card.id)
                  }
                  animate={{
                    y: translateY,
                    scale: scale,
                    rotateZ: isTopCard ? 0 : randomRot,
                    zIndex: index,
                    opacity: 1 - stackLevel * 0.2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: animationConfig.stiffness,
                    damping: animationConfig.damping,
                  }}
                >
                  <card.icon
                    className="w-16 h-16 md:w-20 md:h-20 mb-6 opacity-90 text-primary"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-center">
                    {card.title}
                  </h3>
                </motion.div>
              </CardRotate>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cardsData: CardItem[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function HeroSection() {
  return (
    <CardStack
      cardsData={HERO_CARDS}
      autoplay={true}
      randomRotation={true}
      sendToBackOnClick={true}
      autoplayDelay={4000}
    />
  );
}
