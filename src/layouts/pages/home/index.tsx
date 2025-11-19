// Custom components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EcosystemSection from "./components/EcosystemSection";
import CommunitySection from "./components/CommunitySection";
import TeamSection from "./components/TeamSection";
import RoadmapSection from "./components/RoadmapSection";
import LatestNewsSection from "./components/LatestNewsSection";
import FAQSection from "./components/FAQSection";

// Material Dashboard 2 React examples
import PageLayout from "examples/LayoutContainers/PageLayout";

function Home() {
  return (
    <PageLayout>
      <Header />
      <HeroSection />
      <EcosystemSection />
      <CommunitySection />
      <TeamSection />
      <RoadmapSection />
      <LatestNewsSection />
      <FAQSection />
    </PageLayout>
  );
}

export default Home;
