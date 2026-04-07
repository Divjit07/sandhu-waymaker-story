import { motion } from "framer-motion";

const Listen = () => {
  return (
    <div className="relative min-h-screen bg-waymaker-dark text-white overflow-hidden">
      
      {/* Background Images Split */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
      >
        <img 
          src="/images/Screenshot 2026-03-08 063831.png" 
          alt="Studio 1" 
          className="w-full h-full object-cover"
        />
        <img 
          src="/images/Screenshot 2026-03-08 063837.png" 
          alt="Studio 2" 
          className="w-full h-full object-cover hidden md:block"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-waymaker-dark via-waymaker-dark/80 to-transparent" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.5em] uppercase text-white/50 mb-6"
        >
          Stream the latest hits
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.1em] uppercase leading-none mb-12 drop-shadow-2xl"
        >
          LISTEN NOW
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel p-8 md:p-12 rounded-2xl max-w-lg w-full backdrop-blur-xl bg-white/5 border border-white/10"
        >
          <div className="flex flex-col gap-4">
            <button className="w-full py-4 text-sm tracking-[0.2em] font-bold uppercase rounded bg-white text-waymaker-dark hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.559.3z"/>
              </svg>
              Spotify
            </button>
            <button className="w-full py-4 text-sm tracking-[0.2em] font-bold uppercase rounded border border-white/30 text-white hover:bg-white/10 transition-colors duration-300">
              Apple Music
            </button>
            <button className="w-full py-4 text-sm tracking-[0.2em] font-bold uppercase rounded border border-white/30 text-white hover:bg-white/10 transition-colors duration-300">
              YouTube
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Listen;
