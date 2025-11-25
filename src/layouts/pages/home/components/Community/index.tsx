import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

interface CommunityItem {
  platform: string;
  icon: string;
  stats: number;
  statsLabel: string;
  action: string;
  link: string;
  color: string;
}

const communityData: CommunityItem[] = [
  {
    platform: "Siga-nos no X",
    icon: "twitter",
    stats: 18500,
    statsLabel: "seguidores",
    action: "Seguir",
    link: "https://x.com",
    color: "#000000",
  },
  {
    platform: "Conecte-se no LinkedIn",
    icon: "linkedin",
    stats: 8200,
    statsLabel: "conexões",
    action: "Conectar",
    link: "https://linkedin.com",
    color: "#0A66C2",
  },
  {
    platform: "Junte-se ao Discord",
    icon: "discord",
    stats: 3200,
    statsLabel: "membros",
    action: "Entrar",
    link: "https://discord.com",
    color: "#5865F2",
  },
  {
    platform: "Acesse nosso Telegram",
    icon: "telegram",
    stats: 5400,
    statsLabel: "inscritos",
    action: "Entrar",
    link: "https://telegram.org",
    color: "#2497D3",
  },
];

function Community(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState<number[]>(communityData.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const steps = 60;

    communityData.forEach((item, index) => {
      let start = 0;
      const end = item.stats;
      const increment = end / steps;

      const interval = setInterval(() => {
        start += increment;

        setAnimatedStats((prev) => {
          const updated = [...prev];
          updated[index] = Math.min(Math.floor(start), end);
          return updated;
        });

        if (start >= end) {
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }, []);

  return (
    <MDBox component="section" py={8} id="community">
      <Container>
        <Box sx={{ maxWidth: "700px", mx: "auto", textAlign: "center", mb: 8 }}>
          <MDTypography variant="h3" mb={1}>
            Construído pela Comunidade
          </MDTypography>
          <MDTypography variant="body1" color="secondary">
            Nossa força reside em nossos membros. Junte-se às nossas plataformas e faça parte da
            construção do futuro.
          </MDTypography>
        </Box>

        <Grid container spacing={4}>
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
                  borderRadius: 4,
                  background: "linear-gradient(145deg, #ffffff 0%, #f3f5f9 100%)",
                  boxShadow: "0px 4px 18px rgba(0,0,0,0.08)",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.03)",
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.18)",
                    background: "linear-gradient(145deg, #fafbff 0%, #eef0f6 100%)",
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
                    fontSize: "34px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.35s ease",
                    "&:hover": { transform: "scale(1.12)" },
                  }}
                >
                  <Icon fontSize="large">{item.icon}</Icon>
                </MDBox>

                <MDTypography variant="h5" mb={1}>
                  {item.platform}
                </MDTypography>

                <MDTypography variant="body2" color="secondary" sx={{ mb: 2 }}>
                  <MDTypography
                    variant="h4"
                    component="span"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    {animatedStats[index].toLocaleString("pt-BR")}
                  </MDTypography>{" "}
                  {item.statsLabel}
                </MDTypography>

                <MDBox mt="auto">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" underline="none">
                    <MDTypography
                      variant="button"
                      color="primary"
                      fontWeight="bold"
                      sx={{
                        transition: "color 0.3s ease",
                        "&:hover": { color: "#ff0055" },
                      }}
                    >
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

export default Community;
