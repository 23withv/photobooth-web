"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const IMAGES = [
  {
    src: "https://res.cloudinary.com/dgleeitj5/image/upload/v1777534354/2_dvp8qd.jpg",
    className: "col-start-1 row-span-2 flex items-center justify-center",
    imageClassName: "w-3/4 md:w-2/3 -rotate-2",
    x: "-25%",
    y: "-15%",
  },
  {
    src: "https://res.cloudinary.com/dgleeitj5/image/upload/v1777534355/3_av8a6w.jpg",
    className: "col-start-2 row-span-2 flex items-center justify-center",
    imageClassName: "w-full md:w-11/12 rotate-1",
    x: "-15%",
    y: "20%",
  },
  {
    src: "https://res.cloudinary.com/dgleeitj5/image/upload/v1777542604/VibeSnap_1777542531673_wpfyhq.png",
    className: "col-start-3 row-span-2 z-20 flex items-center justify-center",
    imageClassName: "w-full md:w-[95%]",
    isCenter: true,
    x: "0%",
    y: "0%",
  },
  {
    src: "https://res.cloudinary.com/dgleeitj5/image/upload/v1777534355/4_wyg7bj.jpg",
    className: "col-start-4 col-span-2 row-start-1 self-end flex justify-start pl-4 md:pl-8 pb-4",
    imageClassName: "w-5/6 md:w-3/4 rotate-2",
    x: "20%",
    y: "-25%",
  },
  {
    src: "https://res.cloudinary.com/dgleeitj5/image/upload/v1777534360/5_gnxaza.jpg",
    className: "col-start-4 col-span-2 row-start-2 self-start flex justify-start pl-4 md:pl-8 pt-4",
    imageClassName: "w-3/4 md:w-3/5 -rotate-1",
    x: "25%",
    y: "20%",
  },
];

export function ScrollGallery() {
  const scrollTriggerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTriggerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  return (
    <section
      id="gallery"
      className="relative z-10 h-[300vh] bg-zinc-950 w-full overflow-visible"
    >
      <div 
        ref={scrollTriggerRef} 
        className="absolute inset-0 pointer-events-none" 
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-7xl h-full grid grid-cols-[1fr_1fr_2fr_1fr_1fr] grid-rows-2 gap-4 md:gap-6 px-6 md:px-8">
          {IMAGES.map((img, idx) => {
            if (img.isCenter) {
              return (
                <div key={idx} className={cn("relative z-30", img.className)}>
                  <motion.div
                    style={{ scale }}
                    className="w-full h-full origin-center flex justify-center items-center"
                  >
                    <img
                      src={img.src}
                      alt="Center focus"
                      className={cn(
                        "h-auto object-contain shadow-2xl drop-shadow-2xl",
                        img.imageClassName
                      )}
                    />
                  </motion.div>
                </div>
              );
            }

            return (
              <motion.div
                key={idx}
                style={{
                  opacity,
                  filter: `blur(${blur}px)`,
                  x: useTransform(scrollYProgress, [0, 0.5], ["0%", img.x]),
                  y: useTransform(scrollYProgress, [0, 0.5], ["0%", img.y]),
                }}
                className={cn("relative z-10", img.className)}
              >
                <img
                  src={img.src}
                  alt="Gallery item"
                  className={cn(
                    "h-auto object-contain drop-shadow-xl transition-all duration-500 hover:scale-105",
                    img.imageClassName
                  )}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.85], [0, 1]),
            scale: useTransform(scrollYProgress, [0.6, 0.85], [0.8, 1]),
          }}
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="relative px-4 py-4 mix-blend-normal">
            <div className="absolute inset-0 bg-black/40 blur-3xl rounded-full" />
            <h2
              className="relative text-white text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-center"
              style={{
                textShadow: `0px 4px 4px rgba(0,0,0,0.5), 0px 8px 24px rgba(0,0,0,0.8), 0px 16px 40px rgba(0,0,0,0.9)`,
              }}
            >
              VIBE
              <span className="text-primary italic font-black drop-shadow-md">SNAP.</span>
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}