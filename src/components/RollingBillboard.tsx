import { motion } from "framer-motion";

const phrases = [
  "WAYMAKER VISIONARY",
  "1 BILLION+ STREAMS",
  "CALL ME NAVEEZY",
  "MAJHA SECTOR",
  "PIONEERING THE SOUND",
  "WAYMAKER VISIONARY",
  "1 BILLION+ STREAMS",
  "CALL ME NAVEEZY",
  "MAJHA SECTOR",
  "PIONEERING THE SOUND",
];

const RollingBillboard = () => {
  return (
    <div className="relative w-full overflow-hidden bg-waymaker-dark py-4 md:py-6 border-t border-b border-white/10 z-20">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {phrases.map((phrase, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic">
              {phrase}
            </span>
            <div className="mx-8 h-2 w-2 rounded-full bg-waymaker-accent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RollingBillboard;
