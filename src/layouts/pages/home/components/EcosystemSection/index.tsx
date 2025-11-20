import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import InfoCard from "../InfoCard";

function EcosystemSection(): JSX.Element {
  return (
    <MDBox component="section" py={6}>
      <Container>
        <Grid container spacing={3} item xs={12} lg={8} sx={{ mx: "auto", textAlign: "center" }}>
          <Grid item xs={12}>
            <MDTypography variant="h3" mb={1}>
              Nosso Ecossistema: O Motor da Nova Economia Imobiliária
            </MDTypography>
          </Grid>
          <Grid item xs={12} md={10} sx={{ mx: "auto" }}>
            <MDTypography variant="body1" color="text">
              Nosso ecossistema circular combina governança descentralizada, DeFi e segurança
              jurídica para acelerar negócios na economia real. Usamos a tecnologia blockchain para
              criar uma governança transparente e imutável, onde cada membro tem o poder de decidir
              o futuro da nossa comunidade.
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={6}>
          <Grid item xs={12} md={6} lg={4}>
            <InfoCard
              icon="business"
              title="Incubadora"
              description="Selecionamos e aceleramos negócios reais e projetos de regularização fundiária (REURB), fornecendo a estrutura jurídica para digitalizar ativos físicos."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InfoCard
              icon="gavel"
              title="Governança Descentralizada"
              description="A Credencial de Associado Digital (CAD) dá direito a voto, permitindo que os membros decidam sobre a alocação dos recursos do Tesouro."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InfoCard
              icon="people"
              title="Financiamento Coletivo"
              description="Apresentamos um modelo de crowdfunding descentralizado, onde a própria comunidade financia os projetos aprovados."
            />
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default EcosystemSection;
