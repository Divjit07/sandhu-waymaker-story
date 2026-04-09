import { useScrollProgress } from "@/hooks/useScrollProgress";
import ScrollCanvas from "@/components/ScrollCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EngineeringSection from "@/components/EngineeringSection";
import FeatureSection from "@/components/FeatureSection";
import CraftSection from "@/components/CraftSection";
import CTASection from "@/components/CTASection";
import Biography from "./Biography";
import Discography from "./Discography";
import Tour from "./Tour";
import Listen from "./Listen";
import Shop from "./Shop";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const { progress, frameIndex, totalFrames } = useScrollProgress();

  return (
    <div className="relative">
      <div className="relative" style={{ height: "1500vh" }}>
        <Navbar />
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollCanvas frameIndex={frameIndex} totalFrames={totalFrames} />
          <div className="absolute inset-0">
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
      <div id="discography"><Discography /></div>
      <div id="tour"><Tour /></div>
      <div id="shop"><Shop /></div>
      <div id="listen"><Listen /></div>
      <FooterSection />
    </div>
  );
};

export default Index;
