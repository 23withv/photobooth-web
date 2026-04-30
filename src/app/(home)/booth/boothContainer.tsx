"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { LayoutSelectorStep } from "@/app/(home)/booth/layoutSelectorStep";
import { CameraPreview } from "@/app/(home)/booth/cameraPreview";
import { CanvasEditor } from "@/app/(home)/booth/canvasEditor";
import { ResultStep } from "./resultStep";
import { Hero } from "../hero";
import { KeyFeatures } from "../keyFeature";
import { HowItWorks } from "../howItWorks";
import { FAQs } from "../faqs";
import { FinalCTA } from "../finalCTA";
import { PhotoPreviewStep } from "./photoPreviewStep";
import { ScrollGallery } from "../gallery";

export function BoothContainer() {
  const currentStep = useBoothStore((state) => state.currentStep);

  if (currentStep === 0) {
    return (
      <div className="w-full flex flex-col gap-0 pb-0">
        <Hero />
        <KeyFeatures />
        <HowItWorks />
        <ScrollGallery />
        <FAQs />
        <FinalCTA />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <LayoutSelectorStep />;
      case 2: return <CameraPreview />;
      case 3: return <PhotoPreviewStep />;
      case 4: return <CanvasEditor />;
      case 5: return <ResultStep />;
      default: return null;
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300 flex justify-center">
      {renderStep()}
    </div>
  );
}