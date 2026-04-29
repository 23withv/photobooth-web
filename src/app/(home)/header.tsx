"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoothStore } from "@/store/useBoothStore";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Showcase", id: "showcase" },
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

    if (currentStep !== 0) {
      setStep(0);
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

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
            onClick={(e) => {
              e.preventDefault();
              setStep(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xl md:text-2xl font-black tracking-tighter text-primary hover:opacity-80 transition-opacity active:scale-95"
          >
            VibeSnap
          </Link>

          <nav className="hidden md:flex gap-8 text-[13px] font-bold tracking-widest uppercase text-foreground/70">
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

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setStep(1)}
              className="hidden md:block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
            >
              Start Snap
            </button>

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
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className="cursor-pointer hover:text-primary transition-colors py-2 w-full text-center rounded-2xl hover:bg-white/5"
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </button>
          ))}
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