/**
=========================================================
* Home Page - Created for the new landing page
=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom Footer
import Footer from "layouts/pages/pricing-page/components/Footer";

// Page components
import HomeHeader from "layouts/pages/home/components/Header";

// React-router-dom components
import { Link } from "react-router-dom";

function Home() {
  return (
    <MDBox>
      <HomeHeader />
      <MDBox mt={5} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
            <MDTypography variant="h1" color="info" textGradient>
              Bem-vindo!
            </MDTypography>
            <MDTypography variant="h5" mt={2} mb={4}>
              Esta é a sua nova página inicial.
            </MDTypography>
            <MDTypography>
              Você pode começar a editar esta página em{" "}
              <code>src/layouts/pages/home/index.tsx</code>.
            </MDTypography>
            <MDTypography mt={4}>
              <Link to="/dashboards/analytics">
                Ir para o Dashboard
              </Link>
            </MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </MDBox>
  );
}

export default Home;
