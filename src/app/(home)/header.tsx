"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoothStore } from "@/store/useBoothStore";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Gallery", id: "gallery" },
  { name: "FAQs", id: "faqs" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setStep = useBoothStore((state) => state.setStep);
  const currentStep = useBoothStore((state) => state.currentStep);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (currentStep !== 0) setStep(0);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 py-4 md:px-6 md:py-8 pointer-events-none">
        <div
          className={cn(
            "flex w-full max-w-7xl items-center justify-between px-6 py-3 transition-all duration-500 pointer-events-auto",
            "rounded-full border backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            isScrolled
              ? "bg-black/20 border-white/20 shadow-black/40"
              : "bg-white/3 border-white/10 shadow-none",
          )}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setStep(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tighter text-white hover:text-primary transition-colors active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            VibeSnap
          </Link>
          <nav className="hidden md:flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase text-white/60">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-primary cursor-pointer transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(1)}
              className="hidden md:block px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-[11px] font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Start Session
            </button>
            <button
              className="md:hidden p-2 text-white transition-transform active:scale-90 cursor-pointer rounded-full bg-white/5 border border-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "fixed inset-x-4 top-24 z-40 flex flex-col overflow-hidden transition-all duration-500 md:hidden",
          "rounded-[2rem] border border-white/20 bg-zinc-950/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
          isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto max-h-100 p-6"
            : "-translate-y-10 opacity-0 pointer-events-none max-h-0",
        )}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className="cursor-pointer text-left px-6 py-4 rounded-2xl text-lg font-bold text-white/70 hover:text-primary hover:bg-white/5 transition-all"
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              setStep(1);
              setIsMenuOpen(false);
            }}
            className="mt-4 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm cursor-pointer"
          >
            Start Session
          </button>
        </nav>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
