"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/shared/modeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoothStore } from "@/store/useBoothStore";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setStep = useBoothStore((state) => state.setStep);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-center w-full">
        <div className="flex w-full max-w-7xl items-center justify-between p-6 md:p-8">
          <Link
            href="/"
            onClick={() => setStep(0)}
            className="text-2xl font-extrabold tracking-tight text-primary relative z-50 cursor-pointer hover:opacity-80 transition-opacity active:scale-95"
          >
            VibeSnap
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground relative z-50">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Features
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Pricing
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Community
            </span>
          </nav>

          <div className="flex items-center gap-4 relative z-50">
            <ModeToggle />

            <button
              className="md:hidden p-2 -mr-2 text-foreground transition-transform active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 cursor-pointer" />
              ) : (
                <Menu className="w-6 h-6 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/98 backdrop-blur-md transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex flex-col items-center gap-8 text-3xl md:text-4xl font-medium tracking-tight">
          <span
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </span>
          <span
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </span>
          <span
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Community
          </span>
        </nav>
      </div>
    </>
  );
}
