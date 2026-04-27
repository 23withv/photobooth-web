"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { BoothContainer } from "@/components/booth/boothContainer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Footer } from "./footer";

export default function Home() {
  const currentStep = useBoothStore((state) => state.currentStep);
  const isCameraPreview = currentStep === 2;

  return (
    <main className="relative flex min-h-screen flex-col bg-background overflow-x-hidden">
      {!isCameraPreview && <Header />}

      <div className={`flex flex-col flex-1 w-full items-center ${isCameraPreview ? "py-4 md:py-8" : "pt-24 pb-8"}`}>
        {currentStep === 0 ? (
          <Hero />
        ) : (
          <div className="w-full max-w-7xl px-6 animate-in fade-in zoom-in-95 duration-300">
            <BoothContainer />
          </div>
        )}
      </div>

      {!isCameraPreview && <Footer />}
    </main>
  );
}