interface Props {
  progress: number;
}

const EngineeringSection = ({ progress }: Props) => {
  // Visible from 18% to 38%
  const fadeIn = Math.min(Math.max((progress - 0.18) / 0.05, 0), 1);
  const fadeOut = Math.min(Math.max((0.38 - progress) / 0.05, 0), 1);
  const opacity = Math.min(fadeIn, fadeOut);
  const translateX = (1 - fadeIn) * -60;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex items-center pointer-events-none z-10"
      style={{ opacity }}
    >
      <div
        className="ml-8 md:ml-20 max-w-md"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-waymaker-accent mb-4">The Craft</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-waymaker-dark leading-tight mb-6">
          Precision in
          <br />
          every thread.
        </h2>
        <p className="text-sm md:text-base text-waymaker-dark/60 leading-relaxed max-w-sm">
          Each piece is constructed with obsessive attention to material, weight, and movement.
          Luxury isn't just seen — it's felt.
        </p>
      </div>
    </div>
  );
};

export default EngineeringSection;
