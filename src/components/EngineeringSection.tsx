interface Props {
  progress: number;
}

const EngineeringSection = ({ progress }: Props) => {
  // Visible from 25% to 45%
  const fadeIn = Math.min(Math.max((progress - 0.25) / 0.05, 0), 1);
  const fadeOut = Math.min(Math.max((0.45 - progress) / 0.05, 0), 1);
  const opacity = Math.min(fadeIn, fadeOut);
  const translateX = (1 - fadeIn) * -60;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex items-center pointer-events-none z-10"
      style={{ opacity }}
    >
      <div
        className="ml-8 md:ml-20 max-w-md bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-waymaker-accent mb-4">Biography</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
          Navaan Sandhu
        </h2>
        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-sm">
          An Indian singer, rapper, and songwriter from Amritsar, Punjab. Known for his work in Punjabi music, his songs have charted on the UK Asian Music Chart and Official Charts Company.
        </p>
      </div>
    </div>
  );
};

export default EngineeringSection;
