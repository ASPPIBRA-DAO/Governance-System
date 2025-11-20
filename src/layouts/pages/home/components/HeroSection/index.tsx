import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import bgImage from "assets/images/bg-pricing.jpg";

function HeroSection(): JSX.Element {
  return (
    <>
      <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "internal",
          route: "/authentication/sign-in/cover",
          label: "login",
          color: "light",
        }}
        transparent
        light
      />
      <MDBox
        position="relative"
        minHeight="50vh"
        height="50vh"
        borderRadius="xl"
        m={2}
        pt={2}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { black } }) =>
            `${linearGradient(rgba(black.main, 0.25), rgba(black.main, 0.25))}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative", height: "100%", textAlign: "center" }}
        >
          <Grid item xs={12} md={8}>
            <MDTypography
              component="span"
              variant="body2"
              color="white"
              opacity={0.8}
              fontWeight="bold"
            >
              🚀 INCUBANDO O FUTURO DOS NEGÓCIOS NO BRASIL
            </MDTypography>
            <MDTypography variant="h1" color="white" mt={2} mb={3}>
              A Ponte Definitiva entre o Mundo Real e o{" "}
              <MDTypography component="span" variant="h1" color="primary">
                Mundo Digital
              </MDTypography>
            </MDTypography>
            <MDTypography variant="body1" color="white" opacity={0.8} mb={6}>
              Muito mais que uma associação: somos um ecossistema de aceleração. Unimos segurança
              jurídica, blockchain e IA para transformar propriedades e empresas tradicionais em
              ativos do Mundo Digital.
            </MDTypography>
            <MDBox display="flex" justifyContent="center" gap={2}>
              <MDButton color="primary" variant="contained" size="large">
                Quero Acelerar meu Negócio
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large">
                Conhecer o Ecossistema RWA
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default HeroSection;
