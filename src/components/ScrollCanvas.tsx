import { useRef, useEffect, useState, memo } from "react";

interface ScrollCanvasProps {
  frameIndex: number;
  totalFrames: number;
}

// ─── PERFORMANCE CONSTANTS ─────────────────────────────────────────
// Keyframes are loaded first for instant visual feedback, then
// the rest fill in progressively.
const KEYFRAMES = [0, 59, 119, 179, 239]; // first, quarters, last
const PREFETCH_DISTANCE = 30;  // how far ahead/behind to preload
const PREFETCH_BATCH = 15;     // max concurrent loads per tick
const RESIZE_DEBOUNCE = 150;   // ms to debounce resize

const ScrollCanvas = memo(({ frameIndex, totalFrames }: ScrollCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<Record<number, HTMLImageElement>>({});
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const lastPaintedFrame = useRef<number>(-1);
  const paintRafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  // ─── 1. CANVAS INIT WITH GPU ACCELERATION ────────────────────────
  // {alpha: false} tells the compositor this canvas is fully opaque,
  // skipping expensive alpha blending. {desynchronized: true} decouples
  // the canvas paint from the DOM composite, eliminating vsync stalls.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;
    ctxRef.current = ctx;

    // ─── DEBOUNCED RESIZE ──────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        sizeRef.current = { w, h, dpr };

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        ctx.scale(dpr, dpr);

        // Force repaint after resize
        lastPaintedFrame.current = -1;
      }, RESIZE_DEBOUNCE);
    };

    // Immediate first resize (no debounce)
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h, dpr };
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.scale(dpr, dpr);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ─── 2. SMART PRELOADING: KEYFRAMES FIRST ────────────────────────
  // Load frames 1, 60, 120, 180, 240 immediately so the user always
  // sees *something* at every quarter of the scroll, even on slow connections.
  useEffect(() => {
    if (!totalFrames) return;

    let cancelled = false;
    const loadFrame = (i: number) => {
      if (imagesRef.current[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        if (i === 0) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        if (i === 0) setReady(true);
      };
    };

    // Priority: keyframes first
    KEYFRAMES.forEach((k) => {
      if (k < totalFrames) loadFrame(k);
    });

    return () => { cancelled = true; };
  }, [totalFrames]);

  // ─── 3. PROGRESSIVE PROXIMITY PRELOADING ─────────────────────────
  // As the user scrolls, we aggressively preload frames around the
  // current position so they're ready before the user gets there.
  useEffect(() => {
    if (!totalFrames) return;

    let cancelled = false;
    const start = Math.max(0, frameIndex - PREFETCH_DISTANCE);
    const end = Math.min(totalFrames - 1, frameIndex + PREFETCH_DISTANCE);

    const toLoad: number[] = [];
    // Prioritize forward frames (user scrolls down more than up)
    for (let i = frameIndex; i <= end; i++) {
      if (!imagesRef.current[i]) toLoad.push(i);
    }
    for (let i = frameIndex - 1; i >= start; i--) {
      if (!imagesRef.current[i]) toLoad.push(i);
    }

    const batch = toLoad.slice(0, PREFETCH_BATCH);
    if (batch.length === 0) return;

    batch.forEach((i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        if (i === 0 && !ready) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        if (i === 0) setReady(true);
      };
    });

    return () => { cancelled = true; };
  }, [frameIndex, totalFrames]);

  // ─── 4. PAINT LOOP WITH DEDUPLICATION ────────────────────────────
  // This is the hot path. We:
  //  - Skip if the integer frame hasn't changed (deduplication)
  //  - Cancel previous RAF before scheduling new one (no stacking)
  //  - Use a single drawImage call (no clearRect+fillRect overhead
  //    since alpha:false means the draw fully replaces the buffer)
  useEffect(() => {
    if (!ready) return;

    // INTEGER DEDUPLICATION: skip paint if same frame
    if (frameIndex === lastPaintedFrame.current) return;

    // Cancel any queued paint RAF
    if (paintRafRef.current) cancelAnimationFrame(paintRafRef.current);

    paintRafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const img = imagesRef.current[frameIndex];
      if (!canvas || !ctx) return;

      const { w, h } = sizeRef.current;

      // If the exact frame isn't loaded yet, find the nearest available
      let displayImg = img;
      if (!displayImg) {
        // Search nearby frames for the closest available
        for (let delta = 1; delta < 30; delta++) {
          if (imagesRef.current[frameIndex + delta]) {
            displayImg = imagesRef.current[frameIndex + delta];
            break;
          }
          if (imagesRef.current[frameIndex - delta]) {
            displayImg = imagesRef.current[frameIndex - delta];
            break;
          }
        }
      }
      if (!displayImg) return;

      // Cover-fit the image
      const imgRatio = displayImg.naturalWidth / displayImg.naturalHeight;
      const canvasRatio = w / h;
      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      // Shift image down so it isn't hidden by the header.
      drawY += 140;

      // With alpha:false, drawImage fully replaces the buffer — no clearRect needed.
      ctx.drawImage(displayImg, drawX, drawY, drawW, drawH);
      lastPaintedFrame.current = frameIndex;
    });

    return () => {
      if (paintRafRef.current) cancelAnimationFrame(paintRafRef.current);
    };
  }, [frameIndex, ready]);

  // ─── 5. RENDER WITH GPU HINTS ────────────────────────────────────
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          display: "block",
          background: "#c0c0c0",
          // GPU acceleration hints for the compositor
          willChange: "transform",
          transform: "translateZ(0)",
          contain: "layout paint size",
        }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#c0c0c0]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
            <span className="text-sm tracking-[0.3em] uppercase text-foreground/50">Loading</span>
          </div>
        </div>
      )}
    </div>
  );
});

ScrollCanvas.displayName = "ScrollCanvas";

export default ScrollCanvas;
