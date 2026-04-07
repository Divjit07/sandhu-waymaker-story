import { motion } from "framer-motion";

const Tour = () => {
  return (
    <div className="relative min-h-screen bg-[#c0c0c0] text-waymaker-dark pt-32 pb-20 px-6 md:px-12">
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-waymaker-dark/60 mb-4">
            Live
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase">
            Call Me Naveezy
          </h1>
          <p className="mt-6 text-sm md:text-base text-waymaker-dark/60 max-w-2xl mx-auto">
            The inaugural live performance across Canada marked a significant milestone, kickstarting the tour with grand launches at Vancouver's Commodore Ballroom and Edmonton's Midway Music Hall.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-2 relative group overflow-hidden rounded-sm"
          >
            <img 
              src="/images/Screenshot 2026-03-08 063443.png" 
              alt="Tour Stage" 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs tracking-[0.3em] uppercase opacity-80">Sept 2</p>
              <p className="text-2xl font-bold uppercase tracking-widest">Vancouver</p>
            </div>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative group overflow-hidden rounded-sm h-[238px]"
            >
              <img 
                src="/images/Screenshot 2026-03-08 063522.png" 
                alt="Tour Performance" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-[0.3em] uppercase opacity-80">Sept 3</p>
                <p className="text-xl font-bold uppercase tracking-widest">Edmonton</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="relative group overflow-hidden rounded-sm h-[238px]"
            >
              <img 
                src="/images/Screenshot 2026-03-08 063704.png" 
                alt="Tour Crowd" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-[0.3em] uppercase opacity-80">Sept 16</p>
                <p className="text-xl font-bold uppercase tracking-widest">Toronto</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
