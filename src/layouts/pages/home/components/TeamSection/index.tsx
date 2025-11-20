import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Definição da estrutura de dados para cada membro da equipe
interface TeamMember {
  name: string;
  role: string;
}

// Dados da equipe (com placeholders)
const teamMembers: TeamMember[] = [
  { name: "Nome do Fundador", role: "CEO & Fundador" },
  { name: "Nome do Membro", role: "CTO" },
  { name: "Nome do Membro", role: "Advogado" },
  { name: "Nome do Membro", role: "Gerente de Comunidade" },
];

function TeamSection(): JSX.Element {
  return (
    <MDBox component="section" py={6}>
      <Container>
        <Grid container justifyContent="center" sx={{ textAlign: "center", mb: 6 }}>
          <Grid item xs={12} md={8}>
            <MDTypography variant="h3">Quem Nós Somos</MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <MDBox
                  width="160px"
                  height="160px"
                  borderRadius="50%"
                  border={({ borders: { borderWidth }, palette: { primary } }) =>
                    `${borderWidth[2]} solid ${primary.main}`
                  }
                  mb={2}
                  // Este MDBox serve como placeholder para a imagem
                />
                <MDTypography variant="h5" fontWeight="bold">
                  {member.name}
                </MDTypography>
                <MDTypography variant="body1" color="primary">
                  {member.role}
                </MDTypography>
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default TeamSection;
