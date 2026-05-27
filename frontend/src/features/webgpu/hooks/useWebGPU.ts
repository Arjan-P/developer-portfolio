import { useEffect, type RefObject } from "react";

import { initWebGPU } from "../lib/init";

export function useWebGPU(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    initWebGPU(canvas).then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
    };
  }, [canvasRef]);
}
