import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const studioAlbums = [
  { 
    title: "Way Maker", 
    year: "2022", 
    image: "/album_covers/Waymaker.jpg",
    details: ["Studio Album", "14 Tracks", "Global Impact"]
  },
  { 
    title: "Naveezy", 
    year: "2023", 
    image: "/album_covers/Navezzy.jpg",
    details: ["The Evolution", "Chart Topping", "Majha Sound"]
  },
  { 
    title: "Relentless", 
    year: "2023", 
    image: "/album_covers/Relentless.jpg",
    details: ["EP Release", "Experimental", "Soulful"]
  },
  { 
    title: "The Finest", 
    year: "2024", 
    image: "/album_covers/Thefinest.jpg",
    details: ["Billboard Canada", "High Fashion", "Lyrical Flow"]
  },
];

const bentoItems = [
  { title: "Sprint", type: "Visual", format: "video", src: "/mp4videos/Sprint.mp4" },
  { title: "Relentless", type: "EP", format: "image", image: "/album_covers/Relentless.jpg" },
  { title: "Deewane", type: "Visual", format: "video", src: "/mp4videos/deewane.mp4" },
  { title: "Paper Before Money", type: "EP", format: "image", image: "/album_covers/Paperbeforemoney.jpg" },
  { title: "Warriors Honour", type: "EP", format: "image", image: "/album_covers/Warriorshonour.jpg" },
  { title: "Warriors Honour II", type: "EP", format: "image", image: "/album_covers/Warriorshonour2.jpg" },
  { title: "OOTD", type: "Visual", format: "video", src: "/mp4videos/ootd.mp4" },
  { title: "Do Me A Favour", type: "Single", format: "image", image: "/album_covers/Domeafavour.jpg" },
  { title: "Hirni", type: "Single", format: "image", image: "/album_covers/Hirni.jpg" },
  { title: "BTS", type: "Visual", format: "video", src: "/mp4videos/BTS.mp4" },
  { title: "So Mean", type: "Single", format: "image", image: "/album_covers/somean.jpg" },
  { title: "Live Energy", type: "Visual", format: "video", src: "/mp4videos/Onstage.mp4" },
  { title: "Sit Down Son", type: "Single", format: "image", image: "/album_covers/sitdownson.jpg" },
  { title: "House Naviour", type: "Single", format: "image", image: "/album_covers/housenaviour.jpg" },
  { title: "Way Maker", type: "Studio Album", format: "image", image: "/album_covers/Waymaker.jpg" },
  { title: "The Finest", type: "Studio Album", format: "image", image: "/album_covers/Thefinest.jpg" },
];

const HorizontalGallery = () => {
  return (
    <section className="relative h-screen text-white flex items-center overflow-hidden border-t border-white/10">
      <div className="w-full relative">
        {/* Massive background typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[25vw] font-black opacity-5 uppercase tracking-tighter whitespace-nowrap">
            WAYMAKER
          </h2>
        </div>

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 md:gap-32 px-12 md:px-24 w-max"
        >
          {/* Double the array to create a seamless infinite loop */}
          {[...studioAlbums, ...studioAlbums].map((album, index) => (
            <motion.div 
              key={index}
              className="group relative flex-shrink-0 w-[85vw] md:w-[700px]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Vinyl / Cover Component */}
                <div className="relative aspect-square w-full">
                  {/* Floating Bubble Background Effect */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"
                  />
                  
                  {/* Vinyl Record Behind */}
                  <motion.div 
                    whileHover={{ x: 60, rotate: 360 }}
                    transition={{ type: "spring", damping: 10, stiffness: 50 }}
                    className="absolute right-0 w-full h-full rounded-full bg-[#111] z-0 shadow-2xl overflow-hidden hidden md:block"
                  >
                     <div className="w-full h-full border-[10px] border-white/5 rounded-full flex items-center justify-center">
                        <div className="w-1/3 h-1/3 rounded-full border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                     </div>
                  </motion.div>

                  <div className="relative z-10 w-full h-full rounded-lg overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transform-gpu group-hover:scale-[1.02] transition-transform duration-500">
                    <img 
                      src={album.image} 
                      alt={album.title} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-mono text-waymaker-accent/80 mb-2">{album.year}</span>
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-none group-hover:text-waymaker-accent transition-colors">
                    {album.title}
                  </h3>
                  <div className="space-y-2">
                    {album.details.map((detail, i) => (
                      <p key={i} className="text-sm uppercase tracking-widest opacity-40 font-medium">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  return (
    <section className="min-h-screen text-white pt-12 pb-24 md:pt-16 px-6 md:px-12 relative z-10 border-t border-white/5 -mt-32 md:-mt-48">
      <div className="max-w-7xl mx-auto">
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16 flex flex-col items-center text-center"
         >
            <p className="text-xs tracking-[0.6em] uppercase text-white/40 mb-4">EPs & Singles</p>
            <h2 className="text-5xl md:text-[8rem] font-bold tracking-tighter leading-none uppercase">The Archives</h2>
         </motion.div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[250px] md:auto-rows-[350px]">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: (idx % 4) * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              whileHover={{ scale: 1.02 }}
              className={`relative group rounded-3xl overflow-hidden shadow-2xl cursor-crosshair border border-white/5 
                ${idx === 0 || idx === 6 ? 'md:col-span-2 md:row-span-2' : ''}
                ${idx === 2 || idx === 11 ? 'md:row-span-2' : ''}
              `}
            >
              {item.format === "video" ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  poster="/album_covers/Waymaker.jpg"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-[10px] uppercase tracking-[0.4em] text-waymaker-accent mb-2 font-bold">{item.type}</p>
                <h3 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-lg">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Discography = () => {
  return (
    <div className="w-full">
      <HorizontalGallery />
      <BentoGrid />
    </div>
  );
};

export default Discography;
