"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { HelpCircle, ShieldCheck, Camera, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Are my photos private?",
    answer:
      "Absolutely. Your photos are processed right inside your browser and are never sent to a server. We don't store your personal images, so your memories stay exactly where they belong—with you.",
    icon: ShieldCheck,
  },
  {
    question: "Do I need a professional camera?",
    answer:
      "Not at all. VibeSnap is designed to work beautifully with whatever you have. Whether it's a built-in laptop webcam or your smartphone's front camera, you'll get great results every time.",
    icon: Camera,
  },
  {
    question: "Can I use VibeSnap for my party?",
    answer:
      "Yes, and we highly recommend it! Simply open the link on a tablet or laptop at your event. It’s a great way for guests to create and take home digital keepsakes without any complicated setup.",
    icon: Sparkles,
  },
  {
    question: "Is there any cost to use it?",
    answer:
      "No. VibeSnap is a free project created for the community. You can access every filter, layout, and high-resolution export without paying a dime or creating an account.",
    icon: HelpCircle,
  },
];

function FaqCard({
  faq,
  isOpen,
  onClick,
}: {
  faq: any;
  isOpen: boolean;
  onClick: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        "group relative rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden",
        isOpen
          ? "bg-zinc-900/60 border-primary/50 shadow-2xl shadow-primary/10"
          : "bg-zinc-900/20 border-white/5 hover:border-white/20",
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-6">
            <div
              className={cn(
                "p-3 rounded-2xl border transition-all duration-500",
                isOpen
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white/5 text-muted-foreground border-white/10",
              )}
            >
              <faq.icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <h3
                className={cn(
                  "text-xl md:text-2xl font-bold tracking-tight transition-colors",
                  isOpen
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {faq.question}
              </h3>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <p className="text-muted-foreground text-lg leading-relaxed pt-4 max-w-xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            className={cn(
              "p-2 rounded-full transition-colors",
              isOpen
                ? "text-primary bg-primary/10"
                : "text-muted-foreground bg-white/5",
            )}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="w-full relative py-32 overflow-visible">
      <div className="absolute top-0 bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
            Support Center
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.8] text-foreground">
            Got <br className="hidden lg:block" />
            <span className="text-primary italic">Questions?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto lg:mx-0">
            We’ve simplified everything so you can focus on the vibe. Here’s
            what people usually ask.
          </p>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {FAQ_ITEMS.map((faq, idx) => (
            <FaqCard
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
