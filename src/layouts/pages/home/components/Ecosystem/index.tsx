import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Box, Card, Grid, Typography, IconButton, Tooltip, useTheme } from "@mui/material";
import { User, ShieldCheck, Vote, Rocket, RefreshCw } from "lucide-react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Container from "@mui/material/Container";

// Interfaces
interface CardProps {
  title: string;
  text: string;
  link: string;
}

interface EcosystemCardBaseProps {
  title?: string;
  text?: string;
  linkUrl: string;
  children?: React.ReactNode;
}

interface CardWithCodeProps {
  title?: string;
  text?: string;
  linkUrl: string;
  filePath: string;
}

interface CardWithImageProps {
  title?: string;
  text?: string;
  linkUrl: string;
  imageUrl: string;
}

// InfoCard usando as cores do tema
const InfoCard = ({ title, text, link }: CardProps) => (
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        bgcolor: "background.card", // CORRETO: Usando a cor do tema para cards
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Box>
        <MDTypography variant="h6" fontWeight="bold" color="white" mb={1.5}>
          {title}
        </MDTypography>
        <MDTypography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {text}
        </MDTypography>
      </Box>
      <MDTypography
        component="a"
        href={link}
        variant="body2"
        fontWeight="bold"
        color="info"
        mt={3}
        sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
      >
        Leia mais →
      </MDTypography>
    </Card>
  </Grid>
);

// Card Base usando as cores do tema
const EcosystemCardBase = ({ title, text, linkUrl, children }: EcosystemCardBaseProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 3.5,
        height: "580px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.card", // CORRETO
        borderColor: theme.palette.divider, // CORRETO
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: 2,
      }}
    >
      <MDTypography variant="h5" fontWeight="bold" mb={1.5} color="white">
        {title}
      </MDTypography>
      <MDTypography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.5 }}>
        {text}
      </MDTypography>
      <MDBox sx={{ flex: 1, minHeight: 0 }}>{children}</MDBox>
      <MDTypography
        component="a"
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="body2"
        fontWeight="bold"
        color="info"
        mt="auto"
        pt={2.5}
        sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
      >
        Leia mais →
      </MDTypography>
    </Card>
  );
};

// Card de Código usando o tema
const CardWithCode = ({ title, text, linkUrl, filePath }: CardWithCodeProps) => {
  const [code, setCode] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState("Copy");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const loadCode = async (path: string) => {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Network response was not ok");
        const textContent = await response.text();
        setCode(textContent);
      } catch (error) {
        setCode("// Erro ao carregar o código Solidity.");
      } finally {
        setLoading(false);
      }
    };
    loadCode(filePath);
  }, [filePath]);

  const copyCode = () => {
    if (code) navigator.clipboard.writeText(code).then(() => setCopyMsg("Copiado!"));
  };

  return (
    <EcosystemCardBase title={title} text={text} linkUrl={linkUrl}>
      <MDBox
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            bgcolor: "#161B22" /* Específico do code block */,
          }}
        >
          <MDTypography variant="caption" sx={{ fontFamily: "monospace", color: "grey.500" }}>
            {filePath}
          </MDTypography>
          <Tooltip title={copyMsg} onMouseLeave={() => setCopyMsg("Copy")}>
            <IconButton onClick={copyCode} size="small">
              <MDTypography sx={{ color: "grey.500", "&:hover": { color: "white" } }}>
                [⎘]
              </MDTypography>
            </IconButton>
          </Tooltip>
        </MDBox>
        <MDBox
          sx={{ flex: 1, overflow: "auto", bgcolor: "#0D1117" /* Específico do code block */ }}
        >
          {loading ? (
            <MDBox sx={{ p: 2, color: "grey.400" }}>Carregando...</MDBox>
          ) : (
            <SyntaxHighlighter
              language="solidity"
              style={dracula}
              customStyle={{
                margin: 0,
                padding: "12px",
                fontSize: "14px",
                backgroundColor: "transparent",
                height: "100%",
              }}
              wrapLines
              showLineNumbers={false}
            >
              {code || ""}
            </SyntaxHighlighter>
          )}
        </MDBox>
      </MDBox>
    </EcosystemCardBase>
  );
};

const CardWithImage = ({ title, text, linkUrl, imageUrl }: CardWithImageProps) => (
  <EcosystemCardBase title={title} text={text} linkUrl={linkUrl}>
    <MDBox
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title || "Imagem"}
        sx={{ position: "absolute", width: "100%", height: "100%", objectFit: "contain" }}
      />
    </MDBox>
  </EcosystemCardBase>
);

const ValueFlowDiagram = () => {
  const theme = useTheme();
  const stepStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: 200,
  };
  const iconContainerStyles = (color: string) => ({
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    boxShadow: `0 0 15px ${color}`,
  });

  return (
    <MDBox
      sx={{
        width: "100%",
        py: 6,
        mt: 6,
        bgcolor: "background.card",
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <MDTypography variant="h5" fontWeight="bold" color="white">
          Como o Ecossistema Funciona
        </MDTypography>
        <MDTypography variant="body2" color="text.secondary">
          Do apoio inicial à aceleração real.
        </MDTypography>
      </Box>
      <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 4 }}>
        <Grid item sx={stepStyles}>
          <Box
            sx={{ ...iconContainerStyles(theme.palette.info.main), backgroundColor: "info.main" }}
          >
            <User color="white" size={32} />
          </Box>
          <MDTypography variant="h6" color="white" fontWeight="bold">
            1. Associado
          </MDTypography>
          <MDTypography variant="caption" color="text.secondary">
            Adquire a Credencial (CAD) e contribui com o fundo.
          </MDTypography>
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="h4" color="text.disabled">
            ➜
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item sx={stepStyles}>
              <Box
                sx={{
                  ...iconContainerStyles(theme.palette.secondary.main),
                  backgroundColor: "secondary.main",
                }}
              >
                <ShieldCheck color="white" size={32} />
              </Box>
              <MDTypography variant="h6" color="white" fontWeight="bold">
                2. Tesouro Seguro
              </MDTypography>
              <MDTypography variant="caption" color="text.secondary">
                Recursos auditáveis via Smart Contract.
              </MDTypography>
            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="h4" color="text.disabled">
                ⬇
              </Typography>
            </Grid>
            <Grid item sx={stepStyles}>
              <Box
                sx={{
                  ...iconContainerStyles(theme.palette.secondary.main),
                  backgroundColor: "secondary.main",
                }}
              >
                <Vote color="white" size={32} />
              </Box>
              <MDTypography variant="h6" color="white" fontWeight="bold">
                3. Votação DAO
              </MDTypography>
              <MDTypography variant="caption" color="text.secondary">
                Associados decidem o destino dos fundos.
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="h4" color="text.disabled">
            ➜
          </Typography>
        </Grid>
        <Grid item sx={stepStyles}>
          <Box
            sx={{
              ...iconContainerStyles(theme.palette.success.main),
              backgroundColor: "success.main",
            }}
          >
            <Rocket color="white" size={32} />
          </Box>
          <MDTypography variant="h6" color="white" fontWeight="bold">
            4. Aceleração RWA
          </MDTypography>
          <MDTypography variant="caption" color="text.secondary">
            Financiamento de REURB e Startups selecionadas.
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.disabled",
        }}
      >
        <RefreshCw size={16} />
        <MDTypography variant="caption" sx={{ ml: 1 }}>
          O sucesso dos projetos reinveste na missão da associação (Non-Profit)
        </MDTypography>
      </MDBox>
    </MDBox>
  );
};

const EcosystemSection = () => (
  <MDBox component="section" sx={{ py: 8, bgcolor: "background.default" }} id="ecosystem">
    <Container>
      <MDBox sx={{ textAlign: "center", mb: 8, px: 2, maxWidth: "768px", mx: "auto" }}>
        <MDTypography variant="h3" fontWeight="bold" color="white" gutterBottom>
          Nosso Ecossistema: <br />
          <MDTypography component="span" variant="h3" fontWeight="bold" color="info">
            O Motor da Nova Economia Imobiliária
          </MDTypography>
        </MDTypography>
        <MDTypography variant="body1" color="text.secondary" sx={{ my: 2, lineHeight: 1.6 }}>
          Um ecossistema circular onde a governança descentralizada, em combinação com{" "}
          <MDTypography component="strong" fontWeight="bold" color="white">
            DeFi
          </MDTypography>
          , apoia e acelera empresas e negócios, impulsionando o crescimento da{" "}
          <MDTypography component="strong" fontWeight="bold" color="white">
            economia real
          </MDTypography>
          , garantindo transparência e{" "}
          <MDTypography component="strong" fontWeight="bold" color="white">
            segurança jurídica
          </MDTypography>
          .
        </MDTypography>
        <MDTypography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Mais do que um contrato inteligente, estabelecemos a infraestrutura fundamental para a
          participação da comunidade. Através da{" "}
          <MDTypography component="strong" fontWeight="bold" color="white">
            tecnologia blockchain
          </MDTypography>
          , transformamos a governança em uma ferramenta acessível, imutável e essencial para o
          futuro do mercado imobiliário.
        </MDTypography>
      </MDBox>

      <Grid container spacing={3} alignItems="stretch">
        <InfoCard
          title="Incubadora"
          text="Selecionamos e aceleramos negócios reais e projetos de regularização fundiária. Oferecemos a estrutura jurídica para integrar ativos físicos à economia digital."
          link="#"
        />
        <InfoCard
          title="Governança Descentralizada"
          text="Sua Credencial (CAD) é sua voz. Os associados votam nas assembleias para aprovar projetos e decidir a alocação de recursos do Tesouro."
          link="#"
        />
        <InfoCard
          title="Financiamento Coletivo"
          text="O desenvolvimento é financiado pela força da comunidade. O modelo de Crowdfunding descentralizado impulsiona os projetos aprovados via governança."
          link="#"
        />
      </Grid>

      <MDBox mt={6}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <CardWithCode
              title="Contrato Inteligente – ASPPBR.sol"
              text="A primeira versão do contrato inteligente da ASPPIBRA-DAO."
              filePath="/ASPPBR.sol"
              linkUrl="https://bscscan.com/token/0x0697ab2b003fd2cbaea2df1ef9b404e45be59d4c#code#L1"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardWithImage
              title="Token On-Chain"
              text="Visualização On-Chain do Token ASPPBR na BSC."
              imageUrl="https://storage.googleapis.com/nftimagebucket/bsc/tokens/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613/TVRjMU1ETTVOakV6TWc9PV8xNzYyNzE=.svg"
              linkUrl="https://bscscan.com/token/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613?a=0x5986342d2d50d915fe8d270751577dd6d1624343#code#F1#L1"
            />
          </Grid>
        </Grid>
      </MDBox>
      <ValueFlowDiagram />
    </Container>
  </MDBox>
);

export default EcosystemSection;
