import { useState, useEffect, useCallback, useRef } from "react";

const TOTAL_FRAMES = 192;

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setProgress(p);
      setFrameIndex(Math.min(Math.floor(p * TOTAL_FRAMES), TOTAL_FRAMES - 1));
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return { progress, frameIndex, totalFrames: TOTAL_FRAMES };
}
