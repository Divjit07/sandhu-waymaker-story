interface Props {
  progress: number;
}

const CraftSection = ({ progress }: Props) => {
  // Visible from 75% to 85%
  const fadeIn = Math.min(Math.max((progress - 0.75) / 0.05, 0), 1);
  const fadeOut = Math.min(Math.max((0.85 - progress) / 0.05, 0), 1);
  const opacity = Math.min(fadeIn, fadeOut);
  const translateY = (1 - fadeIn) * 40;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex items-end justify-center pb-24 pointer-events-none z-10"
      style={{ opacity }}
    >
      <div
        className="text-center max-w-lg px-6"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-waymaker-accent mb-4">Live</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-waymaker-dark leading-tight mb-6">
          Call Me
          <br />
          Naveezy Tour
        </h2>
        <p className="text-sm md:text-base text-waymaker-dark/60 leading-relaxed">
          A significant milestone launched at Vancouver's Commodore Ballroom and Edmonton's Midway Music Hall, delivering a highly anticipated and electrifying musical experience.
        </p>
      </div>
    </div>
  );
};

export default CraftSection;
