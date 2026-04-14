import { motion } from "framer-motion";

const topRow = [
  "/hdshots/Leveelgrph.jpg",
  "/hdshots/black_and_white.jpg",
  "/hdshots/bus_stop_uk.jpg",
  "/hdshots/caroutside.jpg",
  "/hdshots/dapper_dan.jpg",
  "/hdshots/fishing.jpg",
  "/hdshots/glassesleft2.jpg",
  "/hdshots/glassesleftpose.jpg",
  "/hdshots/goodjacket.jpg",
  // Duplicate for seamless loop
  "/hdshots/Leveelgrph.jpg",
  "/hdshots/black_and_white.jpg",
  "/hdshots/bus_stop_uk.jpg",
  "/hdshots/caroutside.jpg",
  "/hdshots/dapper_dan.jpg",
  "/hdshots/fishing.jpg",
  "/hdshots/glassesleft2.jpg",
  "/hdshots/glassesleftpose.jpg",
  "/hdshots/goodjacket.jpg",
];

const bottomRow = [
  "/hdshots/good_pose.jpg",
  "/hdshots/jordans.jpg",
  "/hdshots/levelgraph2.jpg",
  "/hdshots/on_road.jpg",
  "/hdshots/onewithJayb.jpg",
  "/hdshots/outside.jpg",
  "/hdshots/fur_coat_dapper_dan.jpg",
  "/hdshots/tradition.jpg",
  // Duplicate for seamless loop
  "/hdshots/good_pose.jpg",
  "/hdshots/jordans.jpg",
  "/hdshots/levelgraph2.jpg",
  "/hdshots/on_road.jpg",
  "/hdshots/onewithJayb.jpg",
  "/hdshots/outside.jpg",
  "/hdshots/fur_coat_dapper_dan.jpg",
  "/hdshots/tradition.jpg",
];

const PhotoGallery = () => {
  return (
    <section className="text-white pt-12 md:pt-24 pb-32 overflow-hidden border-t border-b border-white/5 relative z-10 -mt-24 md:-mt-48">
      {/* Clean Editorial Header */}
      <div className="mb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs tracking-[0.5em] uppercase text-white/40 mb-3">
              The Perspective
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.85]">
              Cinematic Vision
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold leading-relaxed md:text-right max-w-xs">
            High Definition Captures.<br/><span className="text-waymaker-accent">Unfiltered moments.</span>
          </p>
        </motion.div>

        {/* 3-Panel Media Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl group"
          >
            <img src="/hdshots/sidewalkforblankspace.jpg" alt="Sidewalk" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl group"
          >
            <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
               <source src="/mp4videos/BTS.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-4 left-4 z-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-waymaker-accent font-bold">Behind The Scenes</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl group"
          >
            <img src="/hdshots/childhoood.jpg" alt="Heritage" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 z-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-waymaker-accent font-bold">The Roots</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 w-full mt-10">
        {/* Top Row - Scrolling Left */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
            className="flex items-center gap-8 md:gap-12 w-max px-4 hover:[&>div]:pause-animation"
          >
            {topRow.map((src, idx) => (
              <div key={idx} className="relative group w-[50vw] sm:w-[500px] h-[30vh] sm:h-[400px] flex-shrink-0 cursor-pointer overflow-hidden rounded-md shadow-2xl">
                <img 
                  src={src} 
                  alt="Navaan Sandhu Snapshot" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-4">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 35, // Slightly slower for depth
              repeat: Infinity,
            }}
            className="flex items-center gap-8 md:gap-12 w-max px-4"
          >
            {bottomRow.map((src, idx) => (
              <div key={idx} className="relative group w-[40vw] sm:w-[400px] h-[25vh] sm:h-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-md shadow-2xl">
                <img 
                  src={src} 
                  alt="Navaan Sandhu Snapshot" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
