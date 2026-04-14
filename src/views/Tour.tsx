import { motion } from "framer-motion";

const tourDates = [
  { date: "SEPT 02", city: "VANCOUVER", venue: "COMMODORE BALLROOM", status: "SOLD OUT", image: "/images/Screenshot_2026-03-08_063443.png" },
  { date: "SEPT 03", city: "EDMONTON", venue: "MIDWAY MUSIC HALL", status: "SOLD OUT", image: "/images/Screenshot_2026-03-08_063522.png" },
  { date: "SEPT 16", city: "TORONTO", venue: "HISTORY", status: "STADIUM TOUR", image: "/images/Screenshot_2026-03-08_063704.png" },
];

const Tour = () => {
  return (
    <div className="relative min-h-screen bg-[#080808] text-white pt-32 pb-24 overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-waymaker-accent" />
            <p className="text-xs tracking-[0.5em] uppercase text-waymaker-accent font-bold">The Live Experience</p>
          </div>
          <h1 className="text-[12vw] leading-[0.9] font-black tracking-tighter uppercase mb-8">
            CALL ME<br />NAVEEZY
          </h1>
          <p className="text-lg md:text-2xl font-light text-white/40 max-w-3xl leading-relaxed">
            Witness the inaugural tour that redefined the live experience across North America. From the shores of Vancouver to the pulse of Toronto.
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {tourDates.map((tour, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl transition-all duration-700 backdrop-blur-sm overflow-hidden"
            >
              {/* Hover Image Reveal */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <img src={tour.image} alt="" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 z-20">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-waymaker-accent font-mono text-xl md:text-2xl mb-1">{tour.date}</span>
                  <span className="text-xs tracking-widest opacity-40 uppercase">2024</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-4xl md:text-6xl font-black tracking-tight uppercase group-hover:text-waymaker-accent transition-colors duration-500">{tour.city}</h3>
                  <p className="text-sm md:text-base opacity-40 uppercase tracking-widest mt-1">{tour.venue}</p>
                </div>
              </div>

              <div className="mt-8 md:mt-0 z-20">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.3em] uppercase border ${
                    tour.status === "SOLD OUT" 
                    ? "border-waymaker-accent text-waymaker-accent bg-waymaker-accent/10" 
                    : "border-white text-white hover:bg-white hover:text-black"
                  } transition-all duration-500`}
                >
                  {tour.status}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tilted Sold Out Marquee */}
      <div className="absolute -bottom-10 left-0 w-[120%] h-32 bg-waymaker-accent -rotate-3 flex items-center overflow-hidden z-0 opacity-80 pointer-events-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(20).fill("STADIUM TOUR").map((txt, i) => (
            <span key={i} className="text-6xl font-black text-black mx-12 tracking-tighter italic uppercase">{txt}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tour;

