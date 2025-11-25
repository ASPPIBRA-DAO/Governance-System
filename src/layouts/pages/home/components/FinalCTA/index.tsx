import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useTheme, useMediaQuery } from "@mui/material";

function FinalCTA(): JSX.Element {
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
              `${linearGradient(rgba(black.main, 0.45), rgba(black.main, 0.45))}, url(${
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
          <Stack spacing={3} alignItems="center" sx={{ maxWidth: "800px", width: "100%" }}>
            <MDTypography
              component="span"
              variant="body2"
              color="white"
              opacity={0.9}
              fontWeight="bold"
            >
              🚀 O Próximo Passo Para o Futuro do Seu Negócio Começa Agora
            </MDTypography>

            <MDTypography variant={isMobile ? "h2" : "h1"} color="white">
              Transforme o Presente e Conquiste o{" "}
              <MDTypography component="span" variant={isMobile ? "h2" : "h1"} color="primary">
                Futuro
              </MDTypography>
            </MDTypography>

            <MDTypography
              variant="body1"
              color="white"
              opacity={0.85}
              sx={{ textAlign: "justify" }}
            >
              Ao entrar para o ecossistema da ASPFIBRA-DAO, você não só acelera seu negócio — você
              se conecta a uma infraestrutura digital que integra Web3, DeFi, RWA e IA. Essa é a sua
              oportunidade de participar desde o início da construção do Digital World v1.0, o
              ambiente que vai redefinir como ativos reais ganham valor no mundo digital.
            </MDTypography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <MDButton color="primary" variant="contained" size="large" fullWidth={isMobile}>
                Garantir Minha Vaga na Pré-Venda
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large" fullWidth={isMobile}>
                Conhecer o Ecossistema
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default FinalCTA;
