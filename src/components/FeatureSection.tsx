import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  progress: number;
}

const features = [
  { label: "Way Maker", desc: "Studio Album - 2022" },
  { label: "Naveezy", desc: "Studio Album - 2023" },
  { label: "Relentless", desc: "Extended Play - 2023" },
];

const shockingFacts = [
  "1 Billion+ Global Streams",
  "30M+ Monthly Listeners",
  "Chart Dominance in UK/CAN",
  "Pioneer of Cinematic Sound",
];

const callouts = [
  { name: "Waymaker Chrono", price: "$800", top: "55%", left: "20%", anchorX: "30%", anchorY: "60%" },
  { name: "Fur Editorial Coat", price: "$1,200", top: "25%", left: "25%", anchorX: "35%", anchorY: "30%" },
  { name: "Dapper Dan Denim", price: "$450", top: "75%", left: "35%", anchorX: "40%", anchorY: "75%" },
  { name: "Signature Gold Chain", price: "$350", top: "15%", left: "40%", anchorX: "45%", anchorY: "20%" },
  { name: "Leather Moto Gloves", price: "$150", top: "45%", left: "15%", anchorX: "25%", anchorY: "50%" },
];

const ProductCallout = ({ callout, active }: { callout: any, active: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute"
        style={{ top: callout.top, left: callout.left }}
      >
        <div className="flex flex-col items-start translate-x-2 translate-y-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: active ? 120 : 0 }}
            className="h-[2px] bg-white origin-left"
            style={{ transform: "rotate(-45deg)" }}
          />
          <div className="ml-16 -mt-16 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-black/10 shadow-2xl scale-110">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">{callout.name}</p>
            <p className="text-xl font-black text-black leading-none mt-1">{callout.price}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
         initial={{ scale: 0 }}
         animate={{ scale: active ? 1.5 : 0 }}
         className="absolute w-3 h-3 bg-white rounded-full border-2 border-waymaker-accent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
         style={{ top: callout.anchorY, left: callout.anchorX }}
      />
    </div>
  );
};

const FeatureSection = ({ progress }: Props) => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % shockingFacts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Visible from 45% to 90% — stays through the full product explosion
  const fadeIn = Math.min(Math.max((progress - 0.45) / 0.05, 0), 1);
  const fadeOut = Math.min(Math.max((0.90 - progress) / 0.05, 0), 1);
  const opacity = Math.min(fadeIn, fadeOut);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 z-10 p-6 md:p-20"
      style={{ opacity }}
    >
      {/* 1. Left Side Fact Flashcards */}
      <div className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 max-w-sm drop-shadow-xl">
        <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-2">Artist Insights</p>
        <div className="h-32 flex items-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={factIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white outline-black"
            >
              {shockingFacts[factIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Shop the Look Callouts */}
      <div className="absolute inset-0">
        {callouts.map((c, i) => (
          <ProductCallout key={i} callout={c} active={progress > 0.50 && progress < 0.88} />
        ))}
      </div>

      {/* 3. Right Side Releases (Existing) */}
      <div className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 max-w-md text-right drop-shadow-2xl">
        <p className="text-xs tracking-[0.4em] uppercase text-waymaker-accent mb-4 font-bold">Discography</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-8">
          CHART-TOPPING
          <br />
          RELEASES
        </h2>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-end gap-4"
              style={{
                opacity: Math.min(Math.max((progress - 0.52 - i * 0.03) / 0.03, 0), 1),
              }}
            >
              <div className="drop-shadow-lg">
                <p className="text-sm font-bold text-white uppercase tracking-wider">{f.label}</p>
                <p className="text-xs text-white/60 uppercase">{f.desc}</p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-waymaker-accent shadow-[0_0_10px_#ff4d4d]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
