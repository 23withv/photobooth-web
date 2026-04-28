"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { Header } from "./header";
import { Footer } from "./footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentStep = useBoothStore((state) => state.currentStep);
  const isCameraPreview = currentStep === 2;
  const isHero = currentStep === 0;

  return (
    <main className="relative flex min-h-screen flex-col bg-background overflow-x-hidden">
      {!isCameraPreview && <Header />}

      <div className="flex w-full justify-center flex-1">
        <div
          className={`flex flex-col w-full max-w-7xl items-center ${
            isCameraPreview
              ? "py-4 md:py-8 px-4 md:px-8"
              : isHero
                ? "pt-0 pb-8 px-6 md:px-8"
                : "pt-24 pb-8 px-6 md:px-8"
          }`}
        >
          {children}
        </div>
      </div>

      {!isCameraPreview && <Footer />}
    </main>
  );
}
