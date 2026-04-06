interface Props {
  progress: number;
}

const HeroSection = ({ progress }: Props) => {
  // Visible from 0% to 15%
  const opacity = progress < 0.02 ? 1 : progress < 0.15 ? 1 - (progress - 0.02) / 0.13 : 0;
  const translateY = progress < 0.02 ? 0 : (progress - 0.02) * 150;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{ opacity, transform: `translateY(${-translateY}px)` }}
    >
      <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-waymaker-dark/60 mb-4">
        Naavan Sandhu presents
      </p>
      <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.3em] uppercase text-waymaker-dark leading-none">
        WAYMAKER
      </h1>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px w-12 bg-waymaker-dark/30" />
        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-waymaker-dark/70">
          Built Different
        </p>
        <div className="h-px w-12 bg-waymaker-dark/30" />
      </div>
    </div>
  );
};

export default HeroSection;
