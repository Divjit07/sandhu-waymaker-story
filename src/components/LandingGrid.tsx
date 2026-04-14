import { useEffect, useRef } from "react";

/**
 * LandingGrid — Same dot grid + mouse glow as InteractiveGrid,
 * but rendered as a child layer INSIDE the landing page sticky viewport
 * so it appears on top of the scroll canvas frames.
 */
const LandingGrid = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    // Hardware-accelerated mouse tracking
    const updateMousePosition = (e: MouseEvent) => {
      if (!glowRef.current || !containerRef.current) return;
      
      // Use requestAnimationFrame for perfectly locked 60fps updates
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        if (!glowRef.current || !containerRef.current) return;
        // Get the container's position relative to the viewport
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to the container, then offset by half the glow size (400px)
        const x = e.clientX - rect.left - 400;
        const y = e.clientY - rect.top - 400;
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[5] pointer-events-none mix-blend-difference overflow-hidden">
      
      {/* 
        1. 60FPS Hardware-Accelerated Glow
        By using a fixed size div and moving it with translate3d, we bypass Paint and Layout operations completely.
        Increased opacity from 0.15 to 0.4 for higher visibility.
      */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)`,
          transform: `translate3d(-400px, -400px, 0)`, // Start hidden off-screen or center
        }}
      />
      
      {/* 
        2. Static Dotted Grid
        Increased opacity from 0.2 to 0.4 for higher visibility. 
      */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0",
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />
    </div>
  );
};

export default LandingGrid;
