import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";
import { useCountUp } from "./useCountUp"; // IMPORTA O HOOK

interface Community {
  platform: string;
  icon: ReactNode;
  stats: number;
  statsLabel: string;
  action: string;
  link: string;
  color: string;
}

const communityData: Community[] = [
  {
    platform: "Siga-nos no X",
    icon: "twitter",
    stats: 12500,
    statsLabel: "seguidores",
    action: "Seguir",
    link: "https://x.com", 
    color: "#000000",
  },
  {
    platform: "Conecte-se no LinkedIn",
    icon: "linkedin",
    stats: 3270,
    statsLabel: "conexões",
    action: "Conectar",
    link: "https://linkedin.com",
    color: "#0A66C2",
  },
  {
    platform: "Entre no Discord",
    icon: "discord",
    stats: 890,
    statsLabel: "membros",
    action: "Entrar",
    link: "https://discord.com",
    color: "#5865F2",
  },
  {
    platform: "Acesse nosso Telegram",
    icon: "telegram",
    stats: 2100,
    statsLabel: "inscritos",
    action: "Entrar",
    link: "https://telegram.org",
    color: "#2497D3",
  },
];

function Community(): JSX.Element {
  return (
    <MDBox component="section" py={8} id="community">
      <Container>
        <Box sx={{ maxWidth: "700px", mx: "auto", textAlign: "center", mb: 8 }}>
          <MDTypography variant="h3" mb={1}>
            Impulsionado pela Comunidade
          </MDTypography>
          <MDTypography variant="body1" color="secondary">
            Nossa rede cresce diariamente. Conecte-se às nossas plataformas oficiais e faça parte da construção do futuro.
          </MDTypography>
        </Box>

        <Grid container spacing={4}>
          {communityData.map((item, index) => {
            const animatedValue = useCountUp(item.stats);

            return (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    transition: "all 0.35s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0px 15px 35px rgba(0,0,0,0.25)",
                    },
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      background: `radial-gradient(circle, ${item.color}55, transparent)`,
                      transition: "opacity .3s",
                    },
                    "&:hover:before": {
                      opacity: 1,
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
                      animation: "pulse 2.2s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.08)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  >
                    <Icon fontSize="large">{item.icon}</Icon>
                  </MDBox>

                  <MDTypography variant="h5" mb={1}>
                    {item.platform}
                  </MDTypography>

                  <MDTypography variant="body2" color="secondary" sx={{ mb: 2 }}>
                    <MDTypography variant="h5" component="span" color="text.primary">
                      {animatedValue.toLocaleString()}
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
            );
          })}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Community;
