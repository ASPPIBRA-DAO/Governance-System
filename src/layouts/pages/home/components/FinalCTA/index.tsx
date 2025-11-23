
import React from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 PRO React TS components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

const FinalCTA: React.FC = () => {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={12} justifyContent="center">
            <MKBox
              bgColor="grey-100"
              borderRadius="xl"
              p={6}
              textAlign="center"
              width="100%"
            >
              <Stack spacing={3} alignItems="center">
                <MKTypography variant="h2" color="dark" fontWeight="bold">
                  Construa o Futuro, Hoje.
                </MKTypography>
                <MKTypography variant="body1" color="text">
                  Com a ASPFIBRA-DAO, você não apenas investe, mas também participa ativamente da
                  construção de uma infraestrutura descentralizada. Nosso Digital World v 1.0 é a
                  prova de que estamos prontos para Web3, DeFi, RWA e AI.
                </MKTypography>
                <MKButton
                  variant="contained"
                  color="info"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Junte-se a Nós na Pré-Venda
                </MKButton>
              </Stack>
            </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
};

export default FinalCTA;
