
// @mui material components
import { Container, Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const teamMembers = [
  {
    name: "Nome do Fundador",
    role: "CEO & Fundador",
  },
  {
    name: "Nome do CTO",
    role: "CTO & Arquiteto Blockchain",
  },
  {
    name: "Nome do Especialista",
    role: "Especialista em RWA",
  },
];

function TeamSection() {
  return (
    <MDBox component="section" py={{ xs: 6, sm: 12 }} sx={{ backgroundColor: "action.hover" }}>
      <Container>
        <MDTypography variant="h2" fontWeight="bold" textAlign="center" mb={8}>
          Quem Nós Somos
        </MDTypography>
        <Grid container justifyContent="center" spacing={5}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={4} md={3} key={index} textAlign="center">
              <MDBox
                mx="auto"
                mb={2}
                sx={({ palette }) => ({
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: `3px solid ${palette.info.main}`,
                  backgroundColor: "grey.300",
                })}
              />
              <MDTypography variant="h5" fontWeight="bold" mb={0.5}>
                {member.name}
              </MDTypography>
              <MDTypography variant="body1" color="info" fontWeight="medium">
                {member.role}
              </MDTypography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default TeamSection;
