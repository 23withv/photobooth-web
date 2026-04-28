"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/shared/modeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoothStore } from "@/store/useBoothStore";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setStep = useBoothStore((state) => state.setStep);

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full p-4 md:p-6 pointer-events-none">
        <div
          className={cn(
            "flex w-full max-w-7xl items-center justify-between px-6 py-2 transition-all duration-500 pointer-events-auto",
            "rounded-full border shadow-2xl backdrop-blur-xl",
            isScrolled 
              ? "bg-background/15 border-white/10 md:py-2.5 shadow-black/5"
              : "bg-background/5 border-white/5 md:py-3 shadow-none"
          )}
        >
          <Link
            href="/"
            onClick={() => setStep(0)}
            className="text-xl md:text-2xl font-black tracking-tighter text-primary hover:opacity-80 transition-opacity active:scale-95"
          >
            VibeSnap
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-bold tracking-tight text-foreground/70">
            {["Features", "Pricing", "Community"].map((item) => (
              <span key={item} className="hover:text-primary cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />
            <button
              className="md:hidden p-2 text-foreground transition-transform active:scale-90 cursor-pointer rounded-full hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-4 top-20 z-40 flex flex-col overflow-hidden transition-all duration-700 md:hidden",
          "rounded-[2.5rem] border border-white/10 bg-background/20 backdrop-blur-3xl shadow-2xl", 
          isMenuOpen 
            ? "translate-y-0 opacity-100 pointer-events-auto max-h-112.5 p-8" 
            : "-translate-y-10 opacity-0 pointer-events-none max-h-0"
        )}
      >
        <nav className="flex flex-col items-center gap-6 text-2xl font-bold tracking-tighter">
          {["Features", "Pricing", "Community"].map((item) => (
            <span
              key={item}
              className="cursor-pointer hover:text-primary transition-colors py-2 w-full text-center rounded-2xl hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </span>
          ))}
          <div className="w-full h-px bg-white/10 my-2" />
          <button 
            onClick={() => { setStep(1); setIsMenuOpen(false); }}
            className="w-full py-4 rounded-full bg-primary text-primary-foreground text-lg font-black shadow-xl active:scale-95 transition-transform"
          >
            Get Started
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/5 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-500" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}