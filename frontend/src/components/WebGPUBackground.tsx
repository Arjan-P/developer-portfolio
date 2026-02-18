import { useEffect, useRef } from "react";
import { initWebGPU } from "../gpu/init"; 

export default function WebGPUBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if(!canvasRef.current) return;

    let cleanup: (() => void) | undefined;

    initWebGPU(canvasRef.current).then(fn => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="webgpu-bg">
    </canvas>
  )
}
