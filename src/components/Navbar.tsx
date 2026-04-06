import { useEffect, useState } from "react";

const navLinks = ["Overview", "Craft", "Collection", "Shop"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-700"
      style={{
        backgroundColor: scrolled ? "rgba(200,200,200,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase text-waymaker-dark">
        WAYMAKER
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs tracking-[0.2em] uppercase text-waymaker-dark/70 hover:text-waymaker-dark transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      <button className="hidden md:block px-6 py-2 text-xs tracking-[0.2em] uppercase rounded-full bg-waymaker-dark text-white hover:bg-waymaker-dark/90 transition-colors duration-300">
        Discover
      </button>
    </nav>
  );
};

export default Navbar;
