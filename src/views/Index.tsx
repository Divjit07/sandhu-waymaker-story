import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InteractiveGrid from "@/components/InteractiveGrid";
import Biography from "./Biography";
import PhotoGallery from "@/components/PhotoGallery";
import Discography from "./Discography";
import Tour from "./Tour";
import Listen from "./Listen";
import Shop from "./Shop";
import FooterSection from "@/components/FooterSection";
import RollingBillboard from "@/components/RollingBillboard";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-transparent">
      <InteractiveGrid />
      
      {/* Clean, High-Fidelity Hero Section */}
      <Navbar />
      <HeroSection />

      {/* Main Content Sections */}
      <div className="relative z-20 bg-transparent">
        <div id="biography"><Biography /></div>
        <RollingBillboard />
        <div id="discography"><Discography /></div>
        <div id="photogallery"><PhotoGallery /></div>
        <div id="tour"><Tour /></div>
        <div id="shop"><Shop /></div>
        <div id="listen"><Listen /></div>
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
