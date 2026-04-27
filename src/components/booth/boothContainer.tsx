"use client";

import { useBoothStore } from "@/store/useBoothStore";
import { LayoutSelectorStep } from "@/components/booth/layoutSelectorStep";
import { CameraPreview } from "@/components/booth/cameraPreview";
import { CanvasEditor } from "@/components/booth/canvasEditor";

export function BoothContainer() {
  const currentStep = useBoothStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <LayoutSelectorStep />;
      case 2: return <CameraPreview />;
      case 3: return <CanvasEditor />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex justify-center">
      {renderStep()}
    </div>
  );
}