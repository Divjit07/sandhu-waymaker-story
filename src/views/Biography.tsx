import { motion } from "framer-motion";

const Biography = () => {
  return (
    <div className="relative min-h-screen bg-[#c0c0c0] text-waymaker-dark pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Animated Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-waymaker-dark/60">
            The Story
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            Navaan<br />Sandhu
          </h1>
          <div className="grid md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-waymaker-dark/80 max-w-4xl pt-4">
            <p>
              An Indian singer, rapper, and songwriter from Amritsar, Punjab. Navaan Sandhu is a prominent figure in the Punjabi music landscape, consistently pushing boundaries and delivering top-tier audio-visual experiences.
            </p>
            <p>
              His songs have charted rapidly on the UK Asian Music Chart and the Official Charts Company, certifying his widespread international appeal. Renowned for dynamic flows, each project tells a story of ambition, heritage, and unapologetic style.
            </p>
          </div>
        </motion.div>

        {/* Animated Grid Section with Enlarged Main Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main "Navaan Sandhu" Text Photo - Greatly Enlarged */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-2 h-[600px] shadow-2xl rounded-sm overflow-hidden"
          >
            <img 
              src="/images/Screenshot 2026-03-08 062719.png" 
              alt="Navaan Sandhu Featured" 
              className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-700"
            />
          </motion.div>
          
          <div className="flex flex-col gap-6 lg:h-[600px]">
            <motion.img 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              src="/images/Screenshot 2026-03-08 063230.png" 
              alt="Navaan Sandhu Secondary 1" 
              className="w-full h-1/2 object-cover object-center rounded-sm shadow-xl"
            />
            <motion.img 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              src="/images/Screenshot 2026-03-08 063154.png" 
              alt="Navaan Sandhu Secondary 2" 
              className="w-full h-1/2 object-cover object-center rounded-sm shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
