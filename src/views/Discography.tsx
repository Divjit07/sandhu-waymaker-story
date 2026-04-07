import { motion } from "framer-motion";

const releases = [
  {
    title: "Way Maker",
    type: "Studio Album",
    year: "2022",
    image: "/images/Screenshot 2026-03-08 063256.png"
  },
  {
    title: "Relentless",
    type: "Extended Play",
    year: "2023",
    image: "/images/Screenshot 2026-03-08 063319.png"
  },
  {
    title: "Naveezy",
    type: "Studio Album",
    year: "2023",
    image: "/images/Screenshot 2026-03-08 063344.png"
  }
];

const Discography = () => {
  return (
    <div className="relative min-h-screen bg-[#c0c0c0] text-waymaker-dark pt-32 pb-20 px-6 md:px-12">
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-waymaker-dark/60 mb-4">
            Discography
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Chart-Topping Releases
          </h1>
        </motion.div>

        <div className="flex flex-col gap-20 overflow-hidden">
          {releases.map((release, idx) => (
            <motion.div 
              key={release.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 overflow-hidden shadow-2xl rounded">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={release.image} 
                  alt={release.title} 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="w-full md:w-1/2 space-y-4"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-waymaker-dark/60 font-semibold">
                  {release.type} — {release.year}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight uppercase">
                  {release.title}
                </h2>
                <div className="pt-6">
                  <button className="px-6 py-2 text-xs tracking-[0.2em] uppercase rounded-full border border-waymaker-dark/30 text-waymaker-dark hover:bg-waymaker-dark hover:text-white transition-colors duration-300">
                    Listen Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discography;
