import { useScrollProgress } from "@/hooks/useScrollProgress";
import ScrollCanvas from "@/components/ScrollCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EngineeringSection from "@/components/EngineeringSection";
import FeatureSection from "@/components/FeatureSection";
import CraftSection from "@/components/CraftSection";
import CTASection from "@/components/CTASection";
import Biography from "./Biography";
import PhotoGallery from "@/components/PhotoGallery";
import Discography from "./Discography";
import Tour from "./Tour";
import Listen from "./Listen";
import Shop from "./Shop";
import FooterSection from "@/components/FooterSection";
import InteractiveGrid from "@/components/InteractiveGrid";
import RollingBillboard from "@/components/RollingBillboard";
import LandingGrid from "@/components/LandingGrid";

const Index = () => {
  const { progress, frameIndex, totalFrames } = useScrollProgress();

  return (
    <div className="relative min-h-screen">
      <InteractiveGrid />
      
      {/* 
        Scroll container: 800vh gives 240 frames enough scroll runway 
        for smooth 1:1 mapping without feeling sluggish.
        contain: strict tells the browser this subtree is isolated,
        enabling aggressive compositor optimizations.
      */}
      <div 
        id="landing-scroll-container" 
        className="relative z-10" 
        style={{ 
          height: "800vh",
          contain: "layout style",
        }}
      >
        <Navbar />
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ 
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <ScrollCanvas frameIndex={frameIndex} totalFrames={totalFrames} />
          <div className="absolute inset-0" style={{ willChange: "opacity" }}>
            <HeroSection progress={progress} />
            <EngineeringSection progress={progress} />
            <FeatureSection progress={progress} />
            <CraftSection progress={progress} />
            <CTASection progress={progress} />
          </div>
        </div>
      </div>

      {/* Scrollable Static Sections */}
      <div id="biography"><Biography /></div>
      <RollingBillboard />
      <div id="discography"><Discography /></div>
      <div id="photogallery"><PhotoGallery /></div>
      <div id="tour"><Tour /></div>
      <div id="shop"><Shop /></div>
      <div id="listen"><Listen /></div>
      <FooterSection />
    </div>
  );
};

export default Index;
