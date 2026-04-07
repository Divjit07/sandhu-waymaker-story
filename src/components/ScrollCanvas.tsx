import { useRef, useEffect, useState } from "react";

interface ScrollCanvasProps {
  frameIndex: number;
  totalFrames: number;
}

const ScrollCanvas = ({ frameIndex, totalFrames }: ScrollCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<Record<number, HTMLImageElement>>({});
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [ready, setReady] = useState(false);

  // Prefetch only nearby frames; preloading the whole sequence makes the landing page lag.
  const PREFETCH_DISTANCE = 8;
  const PREFETCH_BATCH = 6;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };

      // Reset transform to avoid cumulative scaling.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Progressively prefetch frames near the current scroll position.
  useEffect(() => {
    if (!totalFrames) return;

    let cancelled = false;
    const start = Math.max(0, frameIndex - PREFETCH_DISTANCE);
    const end = Math.min(totalFrames - 1, frameIndex + PREFETCH_DISTANCE);

    const toLoad: number[] = [];
    for (let i = start; i <= end; i++) {
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
        if (i === 0) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        // Allow the animation to continue even if some frames are missing.
        if (i === 0) setReady(true);
      };
    });

    return () => {
      cancelled = true;
    };
  }, [frameIndex, totalFrames]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const { w, h } = sizeRef.current;

    // Clear & fill background color.
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, w, h);

    // Cover-fit the image.
    const imgRatio = img.naturalWidth / img.naturalHeight;
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
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [frameIndex, ready]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block", background: "#c0c0c0" }}
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
};

export default ScrollCanvas;
