/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PricingCards(): JSX.Element {
  return (
    <MDBox mt={8}>
      <MDBox textAlign="center">
        <MDTypography variant="h6" opacity={0.5}>
          More than 50+ brands trust Material
        </MDTypography>
      </MDBox>
      <MDBox mt={5} ml={{ xs: 0, lg: -8 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-coinbase.svg"
              alt="coinbase"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-nasa.svg"
              alt="nasa"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-netflix.svg"
              alt="netflix"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-pinterest.svg"
              alt="pinterest"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-spotify.svg"
              alt="spotify"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox
              component="img"
              src="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/logos/gray-logos/logo-vodafone.svg"
              alt="vodafone"
              width={{ xs: "100%", xl: "125%" }}
              opacity={0.9}
              mb={3}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default PricingCards;
