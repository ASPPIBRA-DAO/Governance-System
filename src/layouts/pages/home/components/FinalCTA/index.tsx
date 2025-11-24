import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function FinalCTA(): JSX.Element {
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
                rgba(black.main, 0.35), // Applying the same pattern from Hero
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
              🚀 CONSTRUA O FUTURO HOJE
            </MDTypography>
            <MDTypography variant="h1" color="white">
              Construa o Futuro,{" "}
              <MDTypography component="span" variant="h1" color="primary">
                Hoje
              </MDTypography>
            </MDTypography>
            <MDTypography variant="body1" color="white" opacity={0.85}>
              Com a ASPFIBRA-DAO, você não apenas investe, mas também participa ativamente da
              construção de uma infraestrutura descentralizada. Nosso Digital World v 1.0 é a prova
              de que estamos prontos para Web3, DeFi, RWA e AI.
            </MDTypography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <MDButton color="primary" variant="contained" size="large">
                Junte-se a Nós na Pré-Venda
              </MDButton>
              <MDButton color="primary" variant="outlined" size="large">
                Saber Mais
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default FinalCTA;
