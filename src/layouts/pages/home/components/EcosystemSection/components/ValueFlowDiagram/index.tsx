// @mui material components
import { Grid, Icon } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material-UI Icons
import Person from "@mui/icons-material/Person";
import GppGood from "@mui/icons-material/GppGood";
import HowToVote from "@mui/icons-material/HowToVote";
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import Sync from "@mui/icons-material/Sync";

function FlowStep({ icon, title, text }) {
  return (
    <MDBox textAlign="center" maxWidth="200px">
      <MDBox
        width="64px"
        height="64px"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mx="auto"
        mb={2}
        sx={({ palette: { info } }) => ({
          backgroundColor: info.main,
          boxShadow: `0 0 15px ${info.main}`,
        })}
      >
        <Icon fontSize="large" sx={{ color: "white" }}>
          {icon}
        </Icon>
      </MDBox>
      <MDTypography variant="h6" color="white" fontWeight="bold">
        {title}
      </MDTypography>
      <MDTypography variant="caption" color="white" sx={{ opacity: 0.7 }}>
        {text}
      </MDTypography>
    </MDBox>
  );
}

function ValueFlowDiagram() {
  return (
    <MDBox
      py={5}
      mt={6}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <MDBox textAlign="center" mb={6}>
        <MDTypography variant="h3" color="white" fontWeight="bold">
          Como o Ecossistema Funciona
        </MDTypography>
        <MDTypography variant="body1" color="white" sx={{ opacity: 0.7 }}>
          Do apoio inicial à aceleração real.
        </MDTypography>
      </MDBox>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        rowSpacing={{ xs: 4, md: 0 }}
        sx={{ px: 2 }}
      >
        {/* Step 1 */}
        <Grid item xs={12} md="auto">
          <FlowStep
            icon={<Person />}
            title="1. Associado"
            text="Adquire a Credencial (CAD) e contribui com o fundo."
          />
        </Grid>

        {/* Arrow */}
        <Grid item xs={12} md="auto" sx={{ display: { xs: "none", md: "block" }, mx: 2 }}>
          <MDTypography color="white" sx={{ opacity: 0.5, fontSize: "2rem" }}>
            ➜
          </MDTypography>
        </Grid>

        {/* Step 2 & 3 Group */}
        <Grid item xs={12} md="auto">
          <MDBox
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={2}
          >
            <FlowStep
              icon={<GppGood />}
              title="2. Tesouro Seguro"
              text="Recursos auditáveis via Smart Contract."
            />
            <MDTypography
              color="white"
              sx={{
                opacity: 0.5,
                fontSize: "2rem",
                transform: { xs: "rotate(90deg)", md: "none" },
              }}
            >
              ⬇
            </MDTypography>
            <FlowStep
              icon={<HowToVote />}
              title="3. Votação DAO"
              text="Associados decidem o destino dos fundos."
            />
          </MDBox>
        </Grid>

        {/* Arrow */}
        <Grid item xs={12} md="auto" sx={{ display: { xs: "none", md: "block" }, mx: 2 }}>
          <MDTypography color="white" sx={{ opacity: 0.5, fontSize: "2rem" }}>
            ➜
          </MDTypography>
        </Grid>

        {/* Step 4 */}
        <Grid item xs={12} md="auto">
          <FlowStep
            icon={<RocketLaunch />}
            title="4. Aceleração RWA"
            text="Financiamento de REURB e Startups selecionadas."
          />
        </Grid>
      </Grid>

      <MDBox mt={6} display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Sync fontSize="small" sx={{ color: "white", opacity: 0.7 }} />
        <MDTypography variant="caption" color="white" sx={{ opacity: 0.7 }}>
          O sucesso dos projetos reinveste na missão da associação (Non-Profit)
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default ValueFlowDiagram;
