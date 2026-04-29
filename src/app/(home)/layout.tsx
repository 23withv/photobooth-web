"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { Header } from "./header";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentStep = useBoothStore((state) => state.currentStep);
  const isCameraPreview = currentStep === 2;
  const isHero = currentStep === 0;

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      {!isCameraPreview && <Header />}
      <div className="flex w-full justify-center flex-1 overflow-visible">
        <div
          className={cn(
            "flex flex-col w-full max-w-7xl items-center overflow-visible",
            isHero ? "pt-0 pb-0 px-6 md:px-8" : "pt-24 pb-0 px-6 md:px-8"
          )}
        >
          {children}
        </div>
      </div>
      {!isCameraPreview && <Footer />}
    </main>
  );
}
