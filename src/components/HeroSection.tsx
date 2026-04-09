interface Props {
  progress: number;
}

const HeroSection = ({ progress }: Props) => {
  const opacity = progress < 0.20 ? 1 : progress < 0.25 ? 1 - (progress - 0.20) / 0.05 : 0;
  const translateY = progress < 0.20 ? 0 : (progress - 0.20) * 150;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{ opacity, transform: `translateY(${-translateY}px)` }}
    >
      <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4"
        style={{
          color: "rgba(20,20,20,0.6)",
          textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)",
        }}
      >
        Navaan Sandhu presents
      </p>
      <h1
        className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.3em] uppercase leading-none"
        style={{
          color: "hsl(0 0% 8%)",
          textShadow:
            "0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)",
          WebkitTextStroke: "1px rgba(20,20,20,0.15)",
        }}
      >
        WAYMAKER
      </h1>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px w-12 bg-waymaker-dark/30" />
        <p
          className="text-sm md:text-base tracking-[0.3em] uppercase"
          style={{
            color: "rgba(20,20,20,0.7)",
            textShadow: "0 0 20px rgba(255,255,255,0.8)",
          }}
        >
          Call Me Naveezy Tour
        </p>
        <div className="h-px w-12 bg-waymaker-dark/30" />
      </div>
    </div>
  );
};

export default HeroSection;
