import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  "/Giant_figure_orbiting_202604140343.mp4",
  "/Figure_with_black_202604140352.mp4",
];

const HeroSection = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const nextVideo = () => setActiveVideo((prev) => (prev + 1) % VIDEOS.length);
  const prevVideo = () => setActiveVideo((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);

  return (
    <div className="relative h-screen w-full overflow-hidden z-10">
      {/* High-Fidelity Video Background Layer — no blur, no grayscale, no overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          <motion.div
            key={activeVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              src={VIDEOS[activeVideo]}
            />
            {/* Minimal dark vignette for text readability without washing out colors */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative h-full w-full flex flex-col items-center justify-center pointer-events-none">
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

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-12 md:bottom-20 flex justify-center items-center gap-12 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevVideo}
            className="group flex flex-col items-center gap-2 outline-none"
          >
            <div className="p-4 rounded-full border border-black/10 bg-white/20 backdrop-blur-md shadow-2xl transition-all group-hover:bg-white/40 group-hover:border-black/20">
              <ChevronLeft className="w-6 h-6 text-black/60" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextVideo}
            className="group flex flex-col items-center gap-2 outline-none"
          >
            <div className="p-4 rounded-full border border-black/10 bg-white/20 backdrop-blur-md shadow-2xl transition-all group-hover:bg-white/40 group-hover:border-black/20">
              <ChevronRight className="w-6 h-6 text-black/60" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
