// @mui material components
import { Card, CardContent, Container, Grid, Icon } from "@mui/material";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material-UI Icons
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GroupsIcon from "@mui/icons-material/Groups";

// Data for the community cards
const communityData = [
  {
    platform: "ASPPIBRA-DAO no X",
    icon: <TwitterIcon fontSize="large" color="info" />,
    stats: "[Número de seguidores]",
    statsLabel: "seguidores",
    action: "Seguir",
    link: "#",
    color: "info.light",
  },
  {
    platform: "ASPPIBRA-DAO no LinkedIn",
    icon: <LinkedInIcon fontSize="large" sx={{ color: "#0A66C2" }} />,
    stats: "[Número de conexões]",
    statsLabel: "conexões",
    action: "Conectar",
    link: "#",
    color: "#CCE5FF", // A light blue
  },
  {
    platform: "Comunidade (BR)",
    icon: <GroupsIcon fontSize="large" color="warning" />,
    stats: "[Número de membros]",
    statsLabel: "membros",
    action: "Entrar",
    link: "#",
    color: "warning.light",
  },
  {
    platform: "Comunidade (EUA/Global)",
    icon: <GroupsIcon fontSize="large" color="success" />,
    stats: "[Número de membros]",
    statsLabel: "membros",
    action: "Entrar",
    link: "#",
    color: "success.light",
  },
];

function CommunitySection() {
  return (
    <MDBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <MDBox textAlign="center" mb={6}>
          <MDTypography variant="h2" fontWeight="bold">
            Construído pela Comunidade
          </MDTypography>
          <MDTypography variant="body1" color="text" mt={1}>
            Nossa força reside em nossos membros. Junte-se a nós em nossas plataformas.
          </MDTypography>
        </MDBox>
        <Grid container spacing={3} justifyContent="center">
          {communityData.map((item, i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: item.color,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <CardContent
                  sx={{
                    pt: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <MDBox>
                    {item.icon && <MDBox mb={2}>{item.icon}</MDBox>}
                    <MDTypography variant="h5" fontWeight="bold">
                      {item.platform}
                    </MDTypography>
                    <MDTypography variant="body2" color="text" mt={1}>
                      {item.stats}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      {item.statsLabel}
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={3}>
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        color="dark"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          "& .arrow-icon": {
                            transition: "transform 0.2s ease-in-out",
                          },
                          "&:hover .arrow-icon": {
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {item.action}
                        <Icon className="arrow-icon" sx={{ ml: 0.5 }}>
                          arrow_forward
                        </Icon>
                      </MDTypography>
                    </Link>
                  </MDBox>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default CommunitySection;
