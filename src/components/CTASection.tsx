interface Props {
  progress: number;
}

const CTASection = ({ progress }: Props) => {
  // Visible from 90% to 100%
  const fadeIn = Math.min(Math.max((progress - 0.90) / 0.06, 0), 1);
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
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-waymaker-accent mb-2 drop-shadow-[0_0_30px_rgba(255,77,77,0.3)]">
          Listen Now
        </h2>
        <p className="text-sm tracking-[0.5em] uppercase text-waymaker-dark font-bold mb-10">
          Stream the latest hits
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center pointer-events-auto transform md:translate-x-12">
          <button className="px-10 py-5 text-[10px] font-black tracking-[0.3em] uppercase rounded-full bg-waymaker-dark text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-2xl">
            Listen on Spotify
          </button>
          <button className="px-10 py-5 text-[10px] font-black tracking-[0.3em] uppercase rounded-full bg-waymaker-accent text-white hover:bg-[#e64444] hover:scale-110 transition-all duration-300 shadow-2xl shadow-waymaker-accent/30">
            View Tour Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
