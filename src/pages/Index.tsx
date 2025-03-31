
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WasteScanner from "@/components/WasteScanner";
import DisposalMap from "@/components/DisposalMap";
import RewardSection from "@/components/RewardSection";
import Footer from "@/components/Footer";
import { ChatButton } from "@/components/ChatButton";
import { CommunityButton } from "@/components/CommunityChat";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <WasteScanner />
        <DisposalMap />
        <RewardSection />
        <FeaturesSection />
      </main>
      <Footer />
      <div>
        <ChatButton/>
        <CommunityButton/>
      </div>
    </div>
  );
};

export default Index;
