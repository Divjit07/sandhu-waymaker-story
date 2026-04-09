import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-waymaker-dark text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold tracking-[0.4em] uppercase mb-4">WAYMAKER</h3>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              By Navaan Sandhu. Built Different. Crafted for those who lead, not follow.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Quick Links</p>
            <div className="flex flex-col gap-3">
              <Link to="/shop" className="text-sm text-white/60 hover:text-white transition-colors">Shop</Link>
              <a href="#biography" className="text-sm text-white/60 hover:text-white transition-colors">Biography</a>
              <a href="#tour" className="text-sm text-white/60 hover:text-white transition-colors">Tour</a>
              <a href="#listen" className="text-sm text-white/60 hover:text-white transition-colors">Listen</a>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">YouTube</a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Spotify</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 uppercase tracking-widest">MADE BY DJ. ALL RIGHTS RESERVED.</p>
          <p className="text-xs text-white/30 tracking-[0.2em] uppercase">Built Different.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
