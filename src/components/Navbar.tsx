import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

const navLinks = [
  { label: "Biography", href: "#biography" },
  { label: "Discography", href: "#discography" },
  { label: "Tour", href: "#tour" },
  { label: "Shop", href: "/shop", isRoute: true },
  { label: "Listen", href: "#listen" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const items = useCart((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-700"
      style={{
        backgroundColor: scrolled ? "rgba(200,200,200,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <Link to="/" className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase text-waymaker-dark">
        WAYMAKER
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) =>
          link.isRoute ? (
            <Link
              key={link.label}
              to={link.href}
              className="text-xs tracking-[0.2em] uppercase text-waymaker-dark/70 hover:text-waymaker-dark transition-colors duration-300"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={isHome ? link.href : `/${link.href}`}
              className="text-xs tracking-[0.2em] uppercase text-waymaker-dark/70 hover:text-waymaker-dark transition-colors duration-300"
            >
              {link.label}
            </a>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative group">
          <ShoppingBag className="w-5 h-5 text-waymaker-dark/70 group-hover:text-waymaker-dark transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-waymaker-accent text-[10px] font-bold text-white flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`block w-5 h-0.5 bg-waymaker-dark transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-waymaker-dark transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-waymaker-dark transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#c0c0c0]/95 backdrop-blur-xl p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-waymaker-dark/70 hover:text-waymaker-dark"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-waymaker-dark/70 hover:text-waymaker-dark"
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
