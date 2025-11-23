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
import Hero from "./components/Hero";
import Ecosystem from "./components/Ecosystem";
import Community from "./components/Community";
import Team from "./components/Team";
import LatestNews from "./components/LatestNews";
import RoadmapSection from "./components/RoadmapSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import Tokenomics from "./components/Tokenomics";

function HomePage(): JSX.Element {
  return (
    <PageLayout>
      <Hero />
      <Ecosystem />
      <Tokenomics />
      <Community />
      <Team />
      <LatestNews />
      <RoadmapSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </PageLayout>
  );
}

export default HomePage;
