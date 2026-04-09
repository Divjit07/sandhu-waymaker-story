import { useEffect, useRef, useCallback } from "react";
import { create } from "zustand";

// ─── CONFIG ────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;

// ─── ZUSTAND STORE ─────────────────────────────────────────────────
// Using Zustand instead of useState eliminates React re-render overhead.
// Components subscribe to individual slices so only the canvas re-paints,
// not the entire tree.
interface ScrollState {
  progress: number;
  frameIndex: number;
  totalFrames: number;
  setScroll: (progress: number, frameIndex: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  frameIndex: 0,
  totalFrames: TOTAL_FRAMES,
  setScroll: (progress, frameIndex) => set({ progress, frameIndex }),
}));

// ─── HOOK ──────────────────────────────────────────────────────────
// This hook drives the scroll → frame mapping. It uses:
//  1. A single RAF per scroll event (cancel previous before scheduling new)
//  2. Integer deduplication: only updates store when floor(frameIndex) changes
//  3. Passive scroll listener for zero main-thread blocking
//  4. Cached DOM lookups to avoid layout thrashing
export function useScrollProgress() {
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const landingRef = useRef<HTMLElement | null>(null);

  const tick = useCallback(() => {
    const scrollTop = window.scrollY;

    // Cache the DOM lookup after first call
    if (!landingRef.current) {
      landingRef.current = document.getElementById("landing-scroll-container");
    }
    const landing = landingRef.current;

    let scrollDistance = 1;
    let startScroll = 0;

    if (landing) {
      scrollDistance = landing.offsetHeight - window.innerHeight;
      startScroll = landing.offsetTop;
    } else {
      scrollDistance = document.documentElement.scrollHeight - window.innerHeight;
    }

    if (scrollDistance <= 0) scrollDistance = 1;

    const p = Math.min(Math.max((scrollTop - startScroll) / scrollDistance, 0), 1);
    const frame = Math.min(Math.floor(p * TOTAL_FRAMES), TOTAL_FRAMES - 1);

    // INTEGER DEDUPLICATION: only push to store when the actual frame changes.
    // This prevents dozens of redundant React re-renders per scroll gesture.
    if (frame !== lastFrameRef.current) {
      lastFrameRef.current = frame;
      useScrollStore.getState().setScroll(p, frame);
    }
  }, []);

  const handleScroll = useCallback(() => {
    // Cancel any queued RAF to prevent frame stacking
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    // Passive listener = browser can composite scroll without waiting for JS
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calc
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Return the same shape for backward compatibility
  return useScrollStore();
}
