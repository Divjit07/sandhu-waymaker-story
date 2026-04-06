interface Props {
  progress: number;
}

const features = [
  { label: "Premium Materials", desc: "Hand-selected fabrics" },
  { label: "Tailored Fit", desc: "Precision construction" },
  { label: "Bold Design", desc: "Statement silhouettes" },
];

const FeatureSection = ({ progress }: Props) => {
  // Visible from 42% to 62%
  const fadeIn = Math.min(Math.max((progress - 0.42) / 0.05, 0), 1);
  const fadeOut = Math.min(Math.max((0.62 - progress) / 0.05, 0), 1);
  const opacity = Math.min(fadeIn, fadeOut);
  const translateX = (1 - fadeIn) * 60;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-end pointer-events-none z-10"
      style={{ opacity }}
    >
      <div
        className="mr-8 md:mr-20 max-w-md text-right"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-waymaker-accent mb-4">Engineered</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-waymaker-dark leading-tight mb-8">
          Engineered
          <br />
          for the bold.
        </h2>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-end gap-4"
              style={{
                opacity: Math.min(Math.max((progress - 0.44 - i * 0.03) / 0.03, 0), 1),
              }}
            >
              <div>
                <p className="text-sm font-semibold text-waymaker-dark">{f.label}</p>
                <p className="text-xs text-waymaker-dark/50">{f.desc}</p>
              </div>
              <div className="h-8 w-8 rounded-full border border-waymaker-dark/20 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-waymaker-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
