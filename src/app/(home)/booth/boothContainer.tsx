"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { LayoutSelectorStep } from "@/app/(home)/booth/layoutSelectorStep";
import { CameraPreview } from "@/app/(home)/booth/cameraPreview";
import { CanvasEditor } from "@/app/(home)/booth/canvasEditor";
import { ResultStep } from "./resultStep";
import { Hero } from "../hero";

export function BoothContainer() {
  const currentStep = useBoothStore((state) => state.currentStep);

  if (currentStep === 0) {
    return <Hero />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <LayoutSelectorStep />;
      case 2: return <CameraPreview />;
      case 3: return <CanvasEditor />;
      case 4: return <ResultStep />;
      default: return null;
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300 flex justify-center">
      {renderStep()}
    </div>
  );
}