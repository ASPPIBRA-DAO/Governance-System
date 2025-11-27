import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Fade from "@mui/material/Fade";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Nome do Fundador",
    role: "CEO & Fundador",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "CTO",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Advogado",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Gerente de Comunidade",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Designer",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Desenvolvedor",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Marketing",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
  {
    name: "Nome do Membro",
    role: "Suporte",
    image: "https://i.postimg.cc/Hk47hRS7/github.png",
  },
];

function Team(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <MDBox component="section" py={6} id="team">
      <Container>
        <Grid container justifyContent="center" sx={{ textAlign: "center", mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Fade in={loaded} timeout={800}>
              <MDTypography variant="h3">Quem Nós Somos</MDTypography>
            </Fade>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" sx={{ alignItems: "stretch" }}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ display: "flex" }}>
              <Fade in={loaded} style={{ transitionDelay: `${index * 150}ms`, width: "100%" }}>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                  sx={{
                    p: 2,
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    height: "100%",
                    ":hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "4px solid #2196f3",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  <MDTypography variant="h5" fontWeight="bold" mt={2}>
                    {member.name}
                  </MDTypography>
                  <MDTypography variant="body1" color="primary">
                    {member.role}
                  </MDTypography>
                </MDBox>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Team;
