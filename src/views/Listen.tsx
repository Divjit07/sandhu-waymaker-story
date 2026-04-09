import { motion } from "framer-motion";

const Listen = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Heavy Atmospheric Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex"
      >
        <img 
          src="/images/Screenshot 2026-03-08 063831.png" 
          alt="Studio Depth" 
          className="w-1/2 h-full object-cover grayscale brightness-50"
        />
        <img 
          src="/images/Screenshot 2026-03-08 063837.png" 
          alt="Technical Flow" 
          className="w-1/2 h-full object-cover grayscale brightness-50 hidden md:block"
        />
      </motion.div>

      {/* Soundwave SVG Background (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none origin-center scale-150">
         <motion.div
           animate={{ 
             scaleY: [1, 1.2, 0.8, 1.1, 1],
             opacity: [0.1, 0.3, 0.1]
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="flex gap-1"
         >
           {Array(40).fill(0).map((_, i) => (
             <motion.div
               key={i}
               animate={{ height: [20, Math.random() * 200 + 40, 20] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
               className="w-1 bg-waymaker-accent/40 rounded-full"
             />
           ))}
         </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-waymaker-accent" />
            <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-waymaker-accent font-bold">The Global Stream</p>
            <div className="h-px w-8 bg-waymaker-accent" />
          </div>
          
          <h1 className="text-[12vw] md:text-[14vw] font-black tracking-tighter uppercase leading-[0.8] mb-8 drop-shadow-[0_0_40px_rgba(255,77,77,0.2)]">
            LISTEN<br />NOW
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-8 md:p-12 rounded-[40px] max-w-xl w-full backdrop-blur-3xl bg-white/[0.03] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          <div className="grid grid-cols-1 gap-4">
            <button className="group relative w-full py-5 text-[10px] tracking-[0.4em] font-black uppercase rounded-full bg-white text-black hover:bg-waymaker-accent hover:text-white transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden">
               <span className="relative z-10">Spotify Top Hits</span>
               <div className="absolute inset-0 bg-gradient-to-r from-waymaker-accent to-[#800000] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button className="w-full py-5 text-[10px] tracking-[0.4em] font-black uppercase rounded-full border border-white/20 text-white hover:border-waymaker-accent hover:bg-white/5 transition-all duration-300">
              Apple Music Original
            </button>
            
            <button className="w-full py-5 text-[10px] tracking-[0.4em] font-black uppercase rounded-full border border-white/20 text-white hover:border-waymaker-accent hover:bg-waymaker-accent/10 transition-all duration-300">
              YouTube Official
            </button>
          </div>
          <p className="mt-10 text-[10px] tracking-[0.2em] text-white/30 uppercase text-center font-bold">
            Available on all digital platforms
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Listen;
