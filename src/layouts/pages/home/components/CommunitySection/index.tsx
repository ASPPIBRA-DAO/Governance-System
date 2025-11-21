import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

// Definição da estrutura de dados para cada card da comunidade
interface Community {
  platform: string;
  icon: ReactNode;
  stats: string;
  statsLabel: string;
  action: string;
  link: string;
  color: string;
}

// Dados da comunidade (ATUALIZADOS)
const communityData: Community[] = [
  {
    platform: "Siga-nos no X",
    icon: "twitter", // Ícone do Twitter/X
    stats: "[Número]",
    statsLabel: "seguidores",
    action: "Seguir",
    link: "#", // TODO: Adicionar link real
    color: "#000000", // Cor do X
  },
  {
    platform: "Conecte-se no LinkedIn",
    icon: "linkedin",
    stats: "[Número]",
    statsLabel: "conexões",
    action: "Conectar",
    link: "#", // TODO: Adicionar link real
    color: "#0A66C2", // Cor do LinkedIn
  },
  {
    platform: "Junte-se ao Discord",
    icon: "discord",
    stats: "[Número]",
    statsLabel: "membros",
    action: "Entrar",
    link: "#", // TODO: Adicionar link real
    color: "#5865F2", // Cor do Discord
  },
  {
    platform: "Acesse nosso Telegram",
    icon: "telegram",
    stats: "[Número]",
    statsLabel: "inscritos",
    action: "Entrar",
    link: "#", // TODO: Adicionar link real
    color: "#2497D3", // Cor do Telegram
  },
];

function CommunitySection(): JSX.Element {
  return (
    <MDBox component="section" py={6} id="community">
      <Container>
        <Box sx={{ maxWidth: "700px", mx: "auto", textAlign: "center", mb: 8 }}>
          <MDTypography variant="h3" mb={1}>
            Construído pela Comunidade
          </MDTypography>
          <MDTypography variant="body1" color="secondary">
            Nossa força reside em nossos membros. Junte-se a nós em nossas plataformas e faça parte
            da construção do futuro.
          </MDTypography>
        </Box>
        <Grid container spacing={3}>
          {communityData.map((item, index) => (
            <Grid key={index} item xs={12} md={6} lg={3}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <MDBox
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.color,
                    color: "white",
                    mb: 3,
                  }}
                >
                  <Icon fontSize="large">{item.icon}</Icon>
                </MDBox>
                <MDTypography variant="h5" mb={1}>
                  {item.platform}
                </MDTypography>
                <MDTypography variant="body2" color="secondary" sx={{ mb: 2 }}>
                  <MDTypography variant="h5" component="span" color="text.primary">
                    {item.stats}
                  </MDTypography>{" "}
                  {item.statsLabel}
                </MDTypography>
                <MDBox mt="auto">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    <MDTypography variant="button" color="primary" fontWeight="bold">
                      {item.action} →
                    </MDTypography>
                  </Link>
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default CommunitySection;
