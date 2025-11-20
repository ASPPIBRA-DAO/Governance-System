/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS examples components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Pricing page components
import Footer from "layouts/pages/pricing-page/components/Footer";

// Sections
import HeroSection from "./components/HeroSection";
import EcosystemSection from "./components/EcosystemSection";
import CommunitySection from "./components/CommunitySection";
import TeamSection from "./components/TeamSection";
import LatestNewsSection from "./components/LatestNewsSection";
import RoadmapSection from "./components/RoadmapSection";
import FAQSection from "./components/FAQSection";

function HomePage(): JSX.Element {
  return (
    <PageLayout>
      <HeroSection />
      <EcosystemSection />
      <CommunitySection />
      <TeamSection />
      <LatestNewsSection />
      <RoadmapSection />
      <FAQSection />
      <Footer />
    </PageLayout>
  );
}

export default HomePage;
