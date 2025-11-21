import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

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

// Dados da comunidade
const communityData: Community[] = [
  {
    platform: "ASPPIBRA-DAO no X",
    icon: "public", // Ícone genérico, pode ser trocado por um ícone de 'X' se disponível
    stats: "[Número de seguidores]",
    statsLabel: "seguidores",
    action: "Seguir",
    link: "#",
    color: "rgba(0, 0, 0, 0.2)", // Fundo escuro semi-transparente
  },
  {
    platform: "LinkedIn da ASPPIBRA",
    icon: "linkedin",
    stats: "[Número de conexões]",
    statsLabel: "conexões",
    action: "Conectar",
    link: "#",
    color: "rgba(10, 102, 194, 0.2)", // Azul do LinkedIn semi-transparente
  },
  {
    platform: "Comunidade no Discord",
    icon: "discord",
    stats: "[Número de membros]",
    statsLabel: "membros",
    action: "Entrar",
    link: "#",
    color: "rgba(88, 101, 242, 0.2)", // Roxo do Discord semi-transparente
  },
  {
    platform: "Canal no Telegram",
    icon: "telegram",
    stats: "[Número de inscritos]",
    statsLabel: "inscritos",
    action: "Entrar",
    link: "#",
    color: "rgba(36, 151, 211, 0.2)", // Azul do Telegram semi-transparente
  },
];

function CommunitySection(): JSX.Element {
  return (
    <MDBox component="section" py={6} id="community">
      <Container>
        <Grid container item xs={12} lg={8} sx={{ mx: "auto", textAlign: "center" }}>
          <MDTypography variant="h3" mb={1}>
            Construído pela Comunidade
          </MDTypography>
          <MDTypography variant="body1" color="text">
            Nossa força reside em nossos membros. Junte-se a nós em nossas plataformas.
          </MDTypography>
        </Grid>
        <Grid container spacing={3} mt={6}>
          {communityData.map((item, index) => (
            <Grid key={index} item xs={12} md={6} lg={3}>
              <Card
                sx={{
                  backdropFilter: "blur(12px)",
                  backgroundColor: item.color,
                  border: ({ borders: { borderWidth }, palette: { white } }) =>
                    `${borderWidth[1]} solid ${white.main}20`,
                  borderRadius: "xl",
                  boxShadow: "lg",
                  height: "100%",
                }}
              >
                <MDBox p={3} display="flex" flexDirection="column" height="100%">
                  <MDTypography variant="h3" color="white">
                    <Icon fontSize="large">{item.icon}</Icon>
                  </MDTypography>
                  <MDTypography variant="h5" color="white" mt={2} mb={1} fontWeight="bold">
                    {item.platform}
                  </MDTypography>
                  <MDTypography variant="body2" color="white" opacity={0.8}>
                    {item.stats} {item.statsLabel}
                  </MDTypography>
                  <MDBox mt="auto" pt={2}>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        textDecoration: "none",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          color: ({ palette: { primary } }) => primary.main,
                          "& .arrow": {
                            transform: "translateX(5px)",
                          },
                        },
                      }}
                    >
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        color="inherit"
                        sx={{ mr: 1 }}
                      >
                        {item.action}
                      </MDTypography>
                      <MDTypography
                        variant="body2"
                        className="arrow"
                        sx={{ transition: "transform 0.2s ease-in-out" }}
                      >
                        →
                      </MDTypography>
                    </Link>
                  </MDBox>
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
