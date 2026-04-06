import { useScrollProgress } from "@/hooks/useScrollProgress";
import ScrollCanvas from "@/components/ScrollCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EngineeringSection from "@/components/EngineeringSection";
import FeatureSection from "@/components/FeatureSection";
import CraftSection from "@/components/CraftSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const { progress, frameIndex, totalFrames } = useScrollProgress();

  return (
    <div className="relative" style={{ height: "500vh" }}>
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
  );
};

export default Index;
