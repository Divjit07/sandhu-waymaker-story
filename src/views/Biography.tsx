import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const hdShots = [
  "/hdshots/childhoood.jpg",
  "/hdshots/Leveelgrph.jpg",
  "/hdshots/black and white.jpg",
  "/hdshots/bus stop uk.jpg",
  "/hdshots/dapper dan.jpg",
  "/hdshots/fishing.jpg",
  "/hdshots/glassesleft2.jpg",
  "/hdshots/glassesleftpose.jpg",
  "/hdshots/good pose.jpg",
  "/hdshots/jordans.jpg",
  "/hdshots/on road.jpg",
  "/hdshots/onewithJayb.jpg",
  "/hdshots/outside.jpg",
  "/hdshots/sitting.jpg",
  "/hdshots/tradition.jpg",
];

const legacyFacts = [
  { value: "1 BILLION+", label: "GLOBAL STREAMS" },
  { value: "30M+", label: "MONTHLY LISTENERS" },
  { value: "#1", label: "UK ASIAN CHART" },
  { value: "HOT", label: "BILLBOARD CANADA" },
];

const FlashcardSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hdShots.length);
    }, 2500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={hdShots[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-top"
          alt="Navaan Sandhu HD Snapshot"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const Biography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPunjabi, setIsPunjabi] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [activeFact, setActiveFact] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % legacyFacts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full text-white overflow-hidden"
    >
      {/* SECTION 1: THE HERO STATEMENT */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative pt-20 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs md:text-sm tracking-[0.6em] uppercase opacity-60 mb-6 font-medium">
            The Visionary
          </p>
          <h1 className="text-[18vw] leading-[0.8] font-bold tracking-tighter uppercase whitespace-nowrap">
            Navaan<br />Sandhu
          </h1>
        </motion.div>
        
        <motion.div 
          style={{ y: parallax1 }}
          className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-white opacity-[0.03] mix-blend-overlay rounded-full blur-[100px] pointer-events-none"
        />
      </section>

      {/* SECTION 2: THE ROOTS */}
      <section className="px-6 md:px-12 py-12 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div style={{ y: parallax2 }} className="w-full">
            <FlashcardSlideshow />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass-panel p-8 lg:p-12 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl h-fit"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
              Born in Amritsar. <br className="hidden md:block"/> Formed by Tradition.
            </h2>
            <div className="space-y-6 text-sm md:text-lg opacity-80 leading-relaxed font-light">
              <p>
                From his earliest days in Punjab, Navaan’s musical foundation was chiseled at the prestigious Gurmeet Bawa Sangeet Academy. He cultivated a deep, uncompromising respect for authentic Punjabi folk structures.
              </p>
              <p>
                But his vision extended beyond the acoustic borderlines. Absorbing the relentless flow of Western hip-hop and icons like Eminem, he sought to create a sonic architecture that would merge global rhythm with local soul.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE ASCENT */}
      <section className="px-6 md:px-12 pb-12 md:pb-24 relative z-10 -mt-16 md:-mt-32">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 md:pt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:col-span-6"
            >
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-6">
                The Ascent
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl font-light opacity-80 leading-relaxed">
                Officially breaking into the industry in 2018 with "In Demand", produced by Manni Sandhu, Navaan declared his arrival with an unapologetic, cinematic sound.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2 }}
               className="md:col-span-6 w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
            >
               <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
                  <source src="/mp4videos/deewane.mp4" type="video/mp4" />
               </video>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Added shocking streaming fact overlay to utilize center grid space */}
            <motion.div 
              style={{ y: parallax2 }}
              className="absolute left-1/2 top-0 -translate-x-1/2 z-20 hidden md:block"
            >
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <p className="text-xs tracking-[0.6em] uppercase text-waymaker-accent mb-2">Streaming Pulse</p>
                <h3 className="text-6xl font-black tracking-tighter italic">1,000,000,000+</h3>
                <p className="text-sm opacity-60 uppercase tracking-widest mt-2">Global Digital Footprint</p>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: parallax1 }}
              className="md:col-span-7 flex flex-col gap-12 lg:gap-24 h-full"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative shrink-0">
                <img 
                  src="/images/Screenshot 2026-03-08 063230.png" 
                  alt="Studio High Fashion" 
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </motion.div>

            <motion.div 
              style={{ y: parallax3 }}
              className="md:col-span-5 w-full aspect-[3/4] md:mt-24 rounded-2xl overflow-hidden shadow-2xl relative"
            >
               <video 
                 src="/mp4videos/Sprint.mp4" 
                 autoPlay loop muted playsInline 
                 className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000" 
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE LEGACY (Upgraded to Massive Flashcards) */}
      <section className="flex flex-col justify-center px-6 md:px-12 pb-16 md:pb-32 relative z-10 -mt-24 md:-mt-48">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-white/10 pt-12 md:pt-16">
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5 }}
             className="md:col-span-4"
          >
            <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-4">The Discography Edge</p>
            <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-6">
              "Every project is a statement."
            </h3>
            <p className="opacity-70 font-light leading-relaxed text-sm lg:text-base">
              From his breakout collaborations like "Special Edition" to charting rapid success on the UK Asian Music Chart, his trajectory is marked by consistency and evolution.
            </p>
          </motion.div>

          {/* Video snippet filling space */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="md:col-span-4 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative"
          >
             <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
               <source src="/mp4videos/ootd.mp4" type="video/mp4" />
             </video>
          </motion.div>

          {/* Flashcard Stats - SHIFTED FOR BETTER SPACING */}
          <div className="md:col-span-4 h-full flex flex-col justify-center lg:pl-12 md:-translate-y-8">
            <div className="relative h-48 w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFact}
                  initial={{ opacity: 0, x: 50, skewX: 10 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  exit={{ opacity: 0, x: -50, skewX: -10 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="absolute inset-0 border-l-4 border-waymaker-accent pl-8 flex flex-col justify-center"
                >
                  <h4 className="text-6xl lg:text-8xl font-black tracking-tighter mb-2 italic leading-none">
                    {legacyFacts[activeFact].value}
                  </h4>
                  <p className="text-sm lg:text-lg opacity-60 uppercase tracking-[0.3em] font-medium leading-tight">
                    {legacyFacts[activeFact].label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Biography;
