
import React from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const FinalCTA: React.FC = () => {
  return (
    <MDBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={12} justifyContent="center">
            <MDBox
              bgColor="grey-100"
              borderRadius="xl"
              p={6}
              textAlign="center"
              width="100%"
            >
              <Stack spacing={3} alignItems="center">
                <MDTypography variant="h2" color="dark" fontWeight="bold">
                  Construa o Futuro, Hoje.
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  Com a ASPFIBRA-DAO, você não apenas investe, mas também participa ativamente da
                  construção de uma infraestrutura descentralizada. Nosso Digital World v 1.0 é a
                  prova de que estamos prontos para Web3, DeFi, RWA e AI.
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="info"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Junte-se a Nós na Pré-Venda
                </MDButton>
              </Stack>
            </MDBox>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default FinalCTA;
