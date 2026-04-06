interface Props {
  progress: number;
}

const CTASection = ({ progress }: Props) => {
  // Visible from 86% to 100%
  const fadeIn = Math.min(Math.max((progress - 0.86) / 0.06, 0), 1);
  const opacity = fadeIn;
  const translateY = (1 - fadeIn) * 50;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{ opacity }}
    >
      <div
        className="text-center"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase text-waymaker-dark mb-4">
          Make Your Way.
        </h2>
        <p className="text-sm tracking-[0.3em] uppercase text-waymaker-dark/50 mb-10">
          The new collection is here
        </p>
        <div className="flex items-center gap-4 justify-center pointer-events-auto">
          <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full bg-waymaker-dark text-white hover:bg-waymaker-dark/90 transition-all duration-300">
            Shop the Collection
          </button>
          <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full border border-waymaker-dark/30 text-waymaker-dark hover:border-waymaker-dark/60 transition-all duration-300">
            Explore WAYMAKER
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
