import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import bgImage from "assets/images/bg-pricing.jpg";

function HeroSection(): JSX.Element {
  return (
    <MDBox component="section" pt={8} pb={2}> {/* Added pt={8} to push content down from the sticky navbar */}
      <Container>
        <MDBox
          position="relative"
          minHeight="50vh"
          height="50vh"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { black } }) =>
              `${linearGradient(
                rgba(black.main, 0.25),
                rgba(black.main, 0.25)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            p: 2,
          }}
        >
          <Grid
            container
            item
            xs={12}
            lg={10}
            justifyContent="center"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <Grid item xs={12}>
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
                {"Muito mais que uma associação: somos um ecossistema de aceleração. Unimos "}
                {"segurança jurídica, blockchain e IA para transformar propriedades e empresas "}
                {"tradicionais em ativos do Mundo Digital."}
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
      </Container>
    </MDBox>
  );
}

export default HeroSection;
