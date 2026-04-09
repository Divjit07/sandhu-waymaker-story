import { useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty("--x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a]"
    >
      {/* 
        1. Smooth Mouse Tracking Spotlight Glow 
        Follows the --x and --y custom properties mathematically.
      */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--x, 50vw) var(--y, 50vh), rgba(255, 255, 255, 0.15) 0%, transparent 80%)`
        }}
      />
      
      {/* 
        2. Dotted Flat Aesthetic Grid 
        Exactly like Google's Stitch interface standard. 
      */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0",
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />
    </div>
  );
};

export default InteractiveGrid;
