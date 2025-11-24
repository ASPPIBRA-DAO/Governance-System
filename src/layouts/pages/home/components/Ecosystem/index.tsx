import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import { User, Landmark, Gavel, Rocket, Repeat } from "lucide-react";

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
  fileOptions: { label: string; path: string; link: string }[];
}

interface CardWithImageProps {
  linkUrl: string;
  imageUrl: string;
}

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

// InfoCard com fundo branco e texto escuro
const InfoCard = ({ title, text, link }: CardProps) => (
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        bgcolor: "white.main",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Box>
        <MDTypography variant="h6" fontWeight="bold" color="dark" mb={1.5}>
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

// Card Base estruturado para alinhamento harmônico
const EcosystemCardBase = ({ title, text, linkUrl, children }: EcosystemCardBaseProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 3.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white.main",
        borderColor: theme.palette.divider,
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: 2,
      }}
    >
      {/* Cabeçalho */}
      <Box sx={{ flexShrink: 0 }}>
        <MDTypography variant="h5" fontWeight="bold" mb={1.5} color="dark">
          {title}
        </MDTypography>
        <MDTypography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.5 }}>
          {text}
        </MDTypography>
      </Box>

      {/* Corpo Flexível */}
      <MDBox sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {children}
      </MDBox>

      {/* Rodapé */}
      <MDTypography
        component="a"
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="body2"
        fontWeight="bold"
        color="info"
        pt={2.5}
        sx={{ flexShrink: 0, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
      >
        Leia mais →
      </MDTypography>
    </Card>
  );
};

// Card de Código com seleção de arquivos
const CardWithCode = ({ title, text, fileOptions }: CardWithCodeProps) => {
  const [activeFile, setActiveFile] = useState(fileOptions[0]);
  const [code, setCode] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState("Copy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCode = async (path: string) => {
      setLoading(true);
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Network response was not ok");
        const textContent = await response.text();
        setCode(textContent);
      } catch (error) {
        setCode(`// Erro ao carregar o arquivo: ${path}`);
      } finally {
        setLoading(false);
      }
    };
    loadCode(activeFile.path);
  }, [activeFile]);

  const copyCode = () => {
    if (code) navigator.clipboard.writeText(code).then(() => setCopyMsg("Copiado!"));
  };

  return (
    <EcosystemCardBase title={title} text={text} linkUrl={activeFile.link}>
      <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexShrink: 0 }}>
        {fileOptions.map((option) => (
          <Chip
            key={option.label}
            label={option.label}
            onClick={() => setActiveFile(option)}
            variant={activeFile.path === option.path ? "filled" : "outlined"}
            color="info"
            size="small"
          />
        ))}
      </Stack>
      <MDBox
        sx={{
          height: "400px", // Altura fixa para o visualizador de código
          borderRadius: 2,
          overflow: "hidden",
          border: (theme) => `1px solid ${theme.palette.divider}`,
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
            bgcolor: "#161B22",
            flexShrink: 0,
          }}
        >
          <MDTypography variant="caption" sx={{ fontFamily: "monospace", color: "grey.500" }}>
            {activeFile.path}
          </MDTypography>
          <Tooltip title={copyMsg} onMouseLeave={() => setCopyMsg("Copy")}>
            <IconButton onClick={copyCode} size="small">
              <MDTypography sx={{ color: "grey.500", "&:hover": { color: "white" } }}>
                [⎘]
              </MDTypography>
            </IconButton>
          </Tooltip>
        </MDBox>
        <MDBox sx={{ flex: 1, overflow: "auto", bgcolor: "#0D1117", minHeight: 0 }}>
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

// Card de Imagem que se ajusta ao conteúdo
const CardWithImage = ({ imageUrl, linkUrl }: CardWithImageProps) => (
  <Card
    component="a"
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "block",
      borderRadius: 2,
      overflow: "hidden",
      lineHeight: 0,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      "&:hover": {
        boxShadow: (theme) => theme.shadows[6],
        transform: "translateY(-2px)",
      },
    }}
  >
    <Box
      component="img"
      src={imageUrl}
      alt="Visualização On-Chain do Token"
      sx={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />
  </Card>
);

// Diagrama de Fluxo com fundo branco e textos escuros
const ValueFlowDiagram = () => {
  const theme = useTheme();

  const Step = ({ icon, title, description, color }: StepProps) => (
    <Grid
      item
      xs
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 200,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}`,
        }}
      >
        {icon}
      </Box>
      <MDTypography variant="h6" color="dark" fontWeight="bold">
        {title}
      </MDTypography>
      <MDTypography variant="caption" color="text.secondary">
        {description}
      </MDTypography>
    </Grid>
  );

  const Arrow = () => (
    <Grid item sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
      <Typography variant="h4" color="grey.500">
        ➜
      </Typography>
    </Grid>
  );

  return (
    <MDBox
      sx={{
        width: "100%",
        py: 6,
        mt: 6,
        bgcolor: "white.main",
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <MDTypography variant="h5" fontWeight="bold" color="dark">
          O Ciclo de Valor do Ecossistema
        </MDTypography>
        <MDTypography variant="body2" color="text.secondary">
          Do apoio inicial ao crescimento sustentável e reinvestimento contínuo.
        </MDTypography>
      </Box>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={{ xs: 4, md: 2 }}
      >
        <Step
          icon={<User color="white" size={32} />}
          title="1. Aquisição"
          description="Associados contribuem e adquirem a Credencial de Governança (CAD)."
          color={theme.palette.info.main}
        />
        <Arrow />
        <Step
          icon={<Landmark color="white" size={32} />}
          title="2. Tesouro"
          description="Recursos são alocados no Tesouro seguro e auditável da DAO."
          color={theme.palette.warning.main}
        />
        <Arrow />
        <Step
          icon={<Gavel color="white" size={32} />}
          title="3. Votação"
          description="Detentores da CAD votam para aprovar os projetos a serem financiados."
          color={theme.palette.secondary.main}
        />
        <Arrow />
        <Step
          icon={<Rocket color="white" size={32} />}
          title="4. Aceleração"
          description="Financiamento de REURB e Startups da economia real selecionadas."
          color={theme.palette.success.main}
        />
        <Arrow />
        <Step
          icon={<Repeat color="white" size={32} />}
          title="5. Reinvestimento"
          description="O sucesso dos projetos retorna valor ao Tesouro, fortalecendo o ciclo."
          color={theme.palette.primary.main}
        />
      </Grid>
    </MDBox>
  );
};

const EcosystemSection = () => {
  const contractOptions = [
    {
      label: "ERC20 v1 (Original)",
      path: "/ERC20_v1.sol",
      link: "https://bscscan.com/token/0x0697ab2b003fd2cbaea2df1ef9b404e45be59d4c#code#L1",
    },
    {
      label: "ERC20 v2 (Padrão)",
      path: "/ERC20_v2.sol",
      link: "#",
    },
    {
      label: "Gov. DAO",
      path: "/Gov_DAO.sol",
      link: "#",
    },
  ];

  return (
    <MDBox component="section" sx={{ py: 8 }} id="ecosystem">
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

        <ValueFlowDiagram />

        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <CardWithCode
                title="Contratos Inteligentes em Destaque"
                text="Explore os pilares de nossa arquitetura on-chain. Selecione um contrato para ver o código."
                fileOptions={contractOptions}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardWithImage
                imageUrl="https://storage.googleapis.com/nftimagebucket/bsc/tokens/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613/TVRjMU1ETTVOakV6TWc9PV8xNzYyNzE=.svg"
                linkUrl="https://bscscan.com/token/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613?a=0x5986342d2d50d915fe8d270751577dd6d1624343#code#F1#L1"
              />
            </Grid>
          </Grid>
        </MDBox>
      </Container>
    </MDBox>
  );
};

export default EcosystemSection;
