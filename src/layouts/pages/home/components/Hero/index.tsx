import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useTheme, useMediaQuery } from "@mui/material";

function Hero(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MDBox component="section" pt={8} pb={2}>
      <Container>
        <MDBox
          position="relative"
          minHeight="60vh"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { black } }) =>
              `${linearGradient(
                rgba(black.main, 0.35),
                rgba(black.main, 0.35)
              )}, url(${process.env.REACT_APP_R2_PUBLIC_URL}/images/bg-pricing.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 3,
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
            <MDTypography variant={isMobile ? "h2" : "h1"} color="white">
              A Ponte Definitiva entre o Mundo Real e o{" "}
              <MDTypography component="span" variant={isMobile ? "h2" : "h1"} color="primary">
                Mundo Digital
              </MDTypography>
            </MDTypography>
            <MDTypography
              variant="body1"
              color="white"
              opacity={0.85}
              sx={{ textAlign: "justify" }}
            >
              Muito mais que uma associação: somos um ecossistema de aceleração. Unimos segurança
              jurídica, blockchain e IA para transformar propriedades e empresas tradicionais em
              ativos do Mundo Digital.
            </MDTypography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <MDButton
                color="primary"
                variant="contained"
                size="large"
                fullWidth={isMobile}
              >
                Quero Acelerar meu Negócio
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large" fullWidth={isMobile}>
                Conhecer o Ecossistema RWA
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default Hero;
