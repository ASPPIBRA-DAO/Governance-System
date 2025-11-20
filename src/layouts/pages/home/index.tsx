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

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";

// Material Dashboard 2 PRO React TS examples components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Pricing page components
import Header from "layouts/pages/pricing-page/components/Header";
import Footer from "layouts/pages/pricing-page/components/Footer";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function HomePage(): JSX.Element {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <PageLayout>
      <Header tabValue={tabValue} tabHandler={handleSetTabValue}>
        <Container>
          <MDBox pt={6} pb={3} textAlign="center">
            <MDBox mb={3}>
              <MDTypography variant="h2" fontWeight="bold">
                Bem-vindo à nossa Plataforma
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography variant="body1">
                Esta é a sua nova página inicial. Aqui você pode apresentar seu aplicativo,
                descrever seus recursos e guiar os usuários.
              </MDTypography>
            </MDBox>
          </MDBox>
        </Container>
      </Header>
      <Footer />
    </PageLayout>
  );
}

export default HomePage;
