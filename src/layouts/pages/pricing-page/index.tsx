import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/pages/pricing-page/components/Footer";
import PricingCards from "layouts/pages/pricing-page/components/PricingCards";
import TrustedBrands from "layouts/pages/pricing-page/components/TrustedBrands";
import Faq from "layouts/pages/pricing-page/components/Faq";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PricingPage(): JSX.Element {
  const [tabValue, setTabValue] = useState<number>(0);
  const [prices, setPrices] = useState<string[]>(["59", "89", "99"]);

  const handleSetTabValue = (event: any, newValue: any) => {
    setTabValue(newValue);
    if (event.currentTarget.id === "annual") {
      setPrices(["119", "159", "399"]);
    } else {
      setPrices(["59", "89", "99"]);
    }
  };

  return (
    <PageLayout>
      <MDBox
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/bg-pricing.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} justifyContent="center" sx={{ textAlign: "center" }}>
            <Stack spacing={2} alignItems="center">
              <MDTypography variant="h1" color="white">
                Pick the best plan for you
              </MDTypography>
              <MDTypography variant="body1" color="white" opacity={0.85}>
                Join thousands of satisfied customers. Choose a plan that fits your needs and unlock
                all the features.
              </MDTypography>
            </Stack>
          </Grid>
        </Container>
      </MDBox>

      <Container sx={{ mt: -10, pb: 12 }}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <MDBox mt={-6} mx="auto">
                <AppBar position="static">
                  <Tabs value={tabValue} onChange={handleSetTabValue} sx={{ borderRadius: "lg" }}>
                    <Tab
                      id="monthly"
                      label={
                        <MDTypography variant="button" textTransform="capitalize" fontWeight="bold">
                          Monthly
                        </MDTypography>
                      }
                    />
                    <Tab
                      id="annual"
                      label={
                        <MDTypography variant="button" textTransform="capitalize" fontWeight="bold">
                          Annual
                        </MDTypography>
                      }
                    />
                  </Tabs>
                </AppBar>
              </MDBox>
              <MDBox pt={6} pb={3} px={3}>
                <PricingCards prices={prices} />
                <TrustedBrands />
                <Faq />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </PageLayout>
  );
}

export default PricingPage;
