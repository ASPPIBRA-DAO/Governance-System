// @mui material components
import { Container, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function HeroSection() {
  return (
    <MDBox component="section" py={{ xs: 6, sm: 12 }} textAlign="center">
      <Container>
        <Grid container item xs={12} lg={8} sx={{ mx: "auto" }}>
          <MDBox mb={4}>
            <MDTypography
              variant="button"
              component="span"
              fontWeight="bold"
              px={2}
              py={1}
              sx={({ palette: { info, white } }) => ({
                backgroundColor: info.main,
                color: white.main,
                borderRadius: "0.5rem",
                textTransform: "uppercase",
              })}
            >
              🚀 Incubando o Futuro dos Negócios no Brasil
            </MDTypography>
          </MDBox>

          <MDTypography variant="h1" mb={3} sx={{ letterSpacing: "-0.025em" }}>
            A Ponte Definitiva entre o Mundo Real e o{" "}
            <MDBox component="span" color="info.main">
              Mundo Digital
            </MDBox>
          </MDTypography>

          <MDTypography
            variant="h5"
            fontWeight="regular"
            color="text"
            mb={5}
            sx={{ maxWidth: "800px", margin: "auto" }}
          >
            Muito mais que uma associação: somos um ecossistema de aceleração. Unimos{" "}
            <MDTypography component="strong" variant="h5" fontWeight="bold">
              segurança jurídica
            </MDTypography>
            ,{" "}
            <MDTypography component="strong" variant="h5" fontWeight="bold">
              blockchain
            </MDTypography>{" "}
            e{" "}
            <MDTypography component="strong" variant="h5" fontWeight="bold">
              IA
            </MDTypography>{" "}
            para transformar propriedades e empresas tradicionais em ativos do Mundo Digital.
          </MDTypography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ margin: "auto" }}>
            <MDButton
              component={Link}
              to="#"
              variant="gradient"
              color="info"
              size="large"
              sx={{
                "& .MuiSvgIcon-root": {
                  transition: "transform 0.2s ease-in-out",
                },
                "&:hover .MuiSvgIcon-root": {
                  transform: "translateX(4px)",
                },
              }}
            >
              Quero Acelerar meu Negócio <ArrowForward sx={{ ml: 1 }} />
            </MDButton>
            <MDButton component={Link} to="#" variant="outlined" color="info" size="large">
              Conhecer o Ecossistema RWA
            </MDButton>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default HeroSection;
