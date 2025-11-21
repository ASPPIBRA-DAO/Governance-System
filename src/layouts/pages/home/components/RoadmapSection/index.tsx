import { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, EffectCreative } from "swiper/modules";
import TimelineCard from "../TimelineCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

// Definição da estrutura para um item do roadmap
interface TimelineItem {
  id: number;
  year: string;
  color: string;
  title: string;
  text: string;
}

// Dados do roadmap
const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "2024",
    color: "#00eaff",
    title: "Lançamento da Plataforma",
    text: "Inauguração da plataforma de governança e do sistema de votação para membros.",
  },
  {
    id: 2,
    year: "2024",
    color: "#ff00ff",
    title: "Primeiro Projeto Financiado",
    text: "Seleção e financiamento do primeiro projeto imobiliário via crowdfunding na plataforma.",
  },
  {
    id: 3,
    year: "2025",
    color: "#00ff8a",
    title: "Expansão do Ecossistema",
    text: "Integração com novos parceiros e expansão dos tipos de ativos que podem ser tokenizados.",
  },
  {
    id: 4,
    year: "2025",
    color: "#ffc400",
    title: "Marketplace Secundário",
    text: "Lançamento de um mercado para negociação de tokens de projetos já financiados.",
  },
  {
    id: 5,
    year: "2026",
    color: "#f80000",
    title: "Governança Totalmente Descentralizada",
    text: "Transição completa para um modelo de DAO, com a comunidade no controle total do tesouro.",
  },
];

function RoadmapSection(): JSX.Element {
  const [activeSlideIndex, setActiveSlideIndex] = useState(Math.floor(timelineData.length / 2));

  return (
    <Box sx={{ py: 6, background: "#0a0f1f" }} id="roadmap">
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={8}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center", mb: 6 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                textShadow: "0 0 10px #00eaff, 0 0 20px #00eaff",
              }}
            >
              Roadmap Futurista
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}>
              Linha do tempo com estética neon, 3D e IA
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Swiper
        modules={[Navigation, EffectCreative]}
        effect="creative"
        centeredSlides
        slidesPerView={3} // Ajuste conforme necessário
        loop
        navigation
        onSlideChange={(swiper: SwiperType) => setActiveSlideIndex(swiper.realIndex)}
        initialSlide={Math.floor(timelineData.length / 2)}
        creativeEffect={{
          prev: {
            translate: ["-120%", 0, -600],
            scale: 0.8,
          },
          next: {
            translate: ["120%", 0, -600],
            scale: 0.8,
          },
        }}
        style={{ padding: "2rem 0" }}
      >
        {timelineData.map((item) => (
          <SwiperSlide key={item.id}>
            <TimelineCard item={item} isCentered={item.id - 1 === activeSlideIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default RoadmapSection;
