import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <MDBox component="footer" py={6} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff" }}>
      <Grid container spacing={4} justifyContent="center" px={4}>
        {/* COLUNA 1: Marca e Social */}
        <Grid item xs={12} md={4}>
          <MDTypography variant="h5" color="white" fontWeight="bold" mb={1}>
            ASPPIBRA-DAO
          </MDTypography>
          <MDTypography variant="body2" color="text" sx={{ opacity: 0.8, mb: 2 }}>
            Redefinindo ativos reais no mundo digital através de Web3 e IA.
          </MDTypography>
          <Stack direction="row" spacing={2}>
            <TwitterIcon sx={{ color: "white", cursor: "pointer" }} />
            <LinkedInIcon sx={{ color: "white", cursor: "pointer" }} />
            <InstagramIcon sx={{ color: "white", cursor: "pointer" }} />
            <FacebookIcon sx={{ color: "white", cursor: "pointer" }} />
          </Stack>
        </Grid>

        {/* COLUNA 2: Ecossistema */}
        <Grid item xs={6} md={2}>
          <MDTypography variant="button" fontWeight="bold" color="white">
            Ecossistema
          </MDTypography>
          <Stack spacing={1} mt={2}>
            <Link
              href="/governance"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Governança
            </Link>
            <Link
              href="/tokenomics"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Tokenomics
            </Link>
            <Link
              href="/rwa"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Ativos (RWA)
            </Link>
          </Stack>
        </Grid>

        {/* COLUNA 3: Recursos */}
        <Grid item xs={6} md={2}>
          <MDTypography variant="button" fontWeight="bold" color="white">
            Recursos
          </MDTypography>
          <Stack spacing={1} mt={2}>
            <Link
              href="/whitepaper"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Whitepaper
            </Link>
            <Link
              href="/docs"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Documentação
            </Link>
            <Link
              href="/audit"
              color="inherit"
              underline="hover"
              sx={{ opacity: 0.7, fontSize: "0.9rem" }}
            >
              Auditorias
            </Link>
          </Stack>
        </Grid>

        {/* COLUNA 4: Smart Contract (Trust Signal) */}
        <Grid item xs={12} md={4}>
          <MDTypography variant="button" fontWeight="bold" color="white">
            Token Contract
          </MDTypography>

          <MDBox
            display="flex"
            alignItems="center"
            mt={2}
            p={1}
            borderRadius="lg"
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <MDTypography
              variant="caption"
              color="white"
              sx={{ fontFamily: "monospace", flexGrow: 1 }}
            >
              0x1234...abcd
            </MDTypography>
            <ContentCopyIcon fontSize="small" sx={{ color: "white", cursor: "pointer" }} />
          </MDBox>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.2)" }} />

      {/* RODAPÉ INFERIOR */}
      <MDBox textAlign="center">
        <MDTypography variant="body2" color="white" opacity={0.6}>
          Copyright &copy; {currentYear} ASPPIBRA-DAO. Todos os direitos reservados.
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default Footer;
