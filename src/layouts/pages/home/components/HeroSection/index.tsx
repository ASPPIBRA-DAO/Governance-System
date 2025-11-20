import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import bgImage from "assets/images/bg-pricing.jpg";

function HeroSection(): JSX.Element {
  return (
    <MDBox component="section" pt={8} pb={2}>
      <Container>
        <MDBox
          position="relative"
          minHeight="60vh" // Increased height for better visual spacing
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { black } }) =>
              `${linearGradient(
                rgba(black.main, 0.35), // Slightly darker gradient for better text contrast
                rgba(black.main, 0.35)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // Ensures content is centered vertically
            textAlign: "center",
            p: 3, // Increased padding
          }}
        >
          <Stack spacing={3} alignItems="center" sx={{ maxWidth: "800px" }}>
            <MDTypography
              component="span"
              variant="body2"
              color="white"
              opacity={0.9}
              fontWeight="bold"
            >
              🚀 INCUBANDO O FUTURO DOS NEGÓCIOS NO BRASIL
            </MDTypography>
            <MDTypography variant="h1" color="white">
              A Ponte Definitiva entre o Mundo Real e o{" "}
              <MDTypography component="span" variant="h1" color="primary">
                Mundo Digital
              </MDTypography>
            </MDTypography>
            <MDTypography variant="body1" color="white" opacity={0.85}>
              Muito mais que uma associação: somos um ecossistema de aceleração. Unimos{" "}
              segurança jurídica, blockchain e IA para transformar propriedades e empresas{" "}
              tradicionais em ativos do Mundo Digital.
            </MDTypography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <MDButton color="primary" variant="contained" size="large">
                Quero Acelerar meu Negócio
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large">
                Conhecer o Ecossistema RWA
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default HeroSection;
