
'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

// @mui material components
import { Card, CardContent, CardHeader, Container } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// --- TYPE DEFINITION ---
interface TimelineItemData {
  id: number;
  year: string;
  color: string;
  title: string;
  text: string;
}

// --- TIMELINE DATA 2025 -> 2030 ---
const timelineData: TimelineItemData[] = [
  { id: 1, year: '2025', color: '#00eaff', title: 'Infraestrutura Digital Rural', text: 'Implementação de conectividade e plataformas digitais para apoiar agricultores familiares.' },
  { id: 2, year: '2026', color: '#00ff95', title: 'Monitoramento Agroecológico Inteligente', text: 'Sensores e IA para monitoramento de solo, clima e biodiversidade nos assentamentos.' },
  { id: 3, year: '2027', color: '#f5ff3d', title: 'Academia Agro Digital', text: 'Capacitação em inclusão digital, agroecologia e tecnologias abertas.' },
  { id: 4, year: '2028', color: '#ff8c00', title: 'Plataforma de Planejamento da Produção', text: 'Ferramentas de previsão de safra, logística e integração com mercados locais.' },
  { id: 5, year: '2029', color: '#bb5bff', title: 'Cooperativas Digitais Inteligentes', text: 'Automação cooperativa com IA para governança e distribuição de renda.' },
  { id: 6, year: '2030', color: '#00c9ff', title: 'Ecossistema Agroecológico Autônomo', text: 'IA, dados comunitários e agroecologia integrados para sistemas sustentáveis.' },
];

// --- FUTURISTIC CARD COMPONENT ---
const TimelineCard = ({ item, isCentered }: { item: TimelineItemData; isCentered: boolean }) => (
  <Card
    sx={{
      position: 'relative',
      width: { xs: 300, sm: 350, md: 400 },
      height: 420,
      borderRadius: '30px',
      overflow: 'hidden',
      backgroundColor: 'rgba(10, 15, 31, 0.7)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: isCentered ? `0 0 40px ${item.color}70` : `0 0 10px ${item.color}40`,
      transition: 'all 500ms ease-out',
      transform: isCentered ? 'scale(1.12)' : 'scale(0.9)',
      opacity: isCentered ? 1 : 0.5,
      display: 'flex',
      flexDirection: 'column',
      '&:hover .neon-glow': {
        opacity: 0.4,
      },
    }}
  >
    <MDBox
      className="neon-glow"
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0,
        filter: 'blur(32px)',
        transition: 'opacity 500ms',
        background: item.color,
      }}
    />
    <CardHeader
      sx={{
        p: 3,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(16px)',
        '.MuiCardHeader-content': {
            width: '100%'
        }
      }}
    >
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography
                variant="h3"
                fontWeight="bold"
                sx={{ 
                    color: item.color,
                    filter: `drop-shadow(0 0 8px ${item.color})`
                }}
            >
                {item.year}
            </MDTypography>
            <MDBox
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    boxShadow: `0 0 15px ${item.color}, inset 0 0 10px ${item.color}80`,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: `linear-gradient(145deg, ${item.color}, #ffffff20)`,
                }}
            >
                {item.id}
            </MDBox>
        </MDBox>
        <MDBox 
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                boxShadow: `0 0 12px ${item.color}`,
                backgroundColor: item.color
            }}
        />
    </CardHeader>
    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, color: '#e0e0e0' }}>
      <MDTypography variant="h5" fontWeight="bold" color="white" sx={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)'}}>
        {item.title}
      </MDTypography>
      <MDTypography variant="body2" color="white" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
        {item.text}
      </MDTypography>
      <MDBox
        sx={{
            mt: 'auto',
            height: '4px',
            width: '112px',
            borderRadius: '999px',
            background: item.color,
            boxShadow: `0 0 12px ${item.color}`,
        }}
      />
    </CardContent>
  </Card>
);

// --- MAIN SECTION COMPONENT ---
function RoadmapSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <MDBox component="section" py={{ xs: 6, sm: 12 }} sx={{ backgroundColor: 'background.default', color: 'white', overflow: 'hidden', position: 'relative' }}>
      <Container>
        <MDBox textAlign="center" maxWidth="48rem" mx="auto" mb={10}>
          <MDTypography variant="h2" fontWeight="bold" sx={{ filter: 'drop-shadow(0 0 12px #00eaff)' }}>
            Roadmap Futurista
          </MDTypography>
          <MDTypography variant="h5" color="text" mt={2} sx={{ opacity: 0.8}}>
            Linha do tempo com estética neon, 3D e IA.
          </MDTypography>
        </MDBox>
        <MDBox height={500} display="flex" justifyContent="center" alignItems="center">
          <Swiper
            effect="creative"
            centeredSlides
            slidesPerView={3}
            loop
            creativeEffect={{
              prev: { translate: ['-120%', 0, -600], scale: 0.8 },
              next: { translate: ['120%', 0, -600], scale: 0.8 },
            }}
            modules={[Navigation, EffectCreative]}
            navigation
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
            style={{ width: '100%', height: '100%', paddingLeft: '40px', paddingRight: '40px' }}
          >
            {timelineData.map((item) => (
              <SwiperSlide key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TimelineCard item={item} isCentered={item.id - 1 === activeSlideIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default RoadmapSection;
