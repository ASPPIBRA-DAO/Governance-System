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
              `${linearGradient(rgba(black.main, 0.35), rgba(black.main, 0.35))}, url(${
                process.env.REACT_APP_R2_PUBLIC_URL
              }/images/bg-pricing.jpg)`,
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
              🚀 Transformando Negócios Tradicionais em Ativos Digitais
            </MDTypography>
            <MDTypography variant={isMobile ? "h2" : "h1"} color="white">
              A Ponte Definitiva Entre o{" "}
              <MDTypography component="span" variant={isMobile ? "h2" : "h1"} color="primary">
                Mundo Real e o Mundo Digital
              </MDTypography>
            </MDTypography>
            <MDTypography
              variant="body1"
              color="white"
              opacity={0.85}
              sx={{ textAlign: "justify" }}
            >
              Somos mais que uma associação — somos um ecossistema de aceleração que conecta
              segurança jurídica, blockchain e inteligência artificial para transformar
              propriedades, empresas e projetos reais em ativos digitais de alto valor. O futuro dos
              negócios já começou. Agora é a sua vez de participar.
            </MDTypography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <MDButton color="primary" variant="contained" size="large" fullWidth={isMobile}>
                Quero Digitalizar meu Negócio
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large" fullWidth={isMobile}>
                Explorar o Ecossistema RWA
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default Hero;
