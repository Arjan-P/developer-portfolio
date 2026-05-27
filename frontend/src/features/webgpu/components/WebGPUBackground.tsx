// src/features/webgpu/components/WebGPUBackground.tsx

import { useRef } from "react";

import { useWebGPU } from "../hooks/useWebGPU";

export default function WebGPUBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useWebGPU(canvasRef);

  return <canvas ref={canvasRef} className="webgpu-bg" />;
}
