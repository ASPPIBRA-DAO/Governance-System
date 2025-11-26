import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { User, Landmark, Gavel, Rocket, Repeat } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  color: string; // hex or rgba
  Icon?: React.ReactNode;
};

const defaultSteps: Step[] = [
  { id: 1, title: "Aquisição", description: "Associados contribuem e adquirem a Credencial de Governança (CAD).", color: "#1976d2", Icon: <User size={20} /> },
  { id: 2, title: "Tesouro", description: "Recursos são alocados no Tesouro seguro e auditável da DAO.", color: "#ff9800", Icon: <Landmark size={20} /> },
  { id: 3, title: "Votação", description: "Detentores da CAD votam para aprovar projetos financiáveis.", color: "#8e24aa", Icon: <Gavel size={20} /> },
  { id: 4, title: "Aceleração", description: "Financiamento de REURB e startups da economia real selecionadas.", color: "#43a047", Icon: <Rocket size={20} /> },
  { id: 5, title: "Reinvestimento", description: "O sucesso dos projetos retorna valor ao Tesouro, fortalecendo o ciclo.", color: "#e91e63", Icon: <Repeat size={20} /> },
];

type Props = {
  steps?: Step[];
  title?: string;
  subtitle?: string;
};

const StepItem: React.FC<{ step: Step; side: "left" | "right" }> = ({ step, side }) => {
  const theme = useTheme();
  const isLeft = side === "left";

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "50%" },
        px: { xs: 2, md: 4 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: isLeft ? "flex-end" : "flex-start",
        mb: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 420,
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* Circle Icon */}
          <Box
            sx={{
              minWidth: 56,
              minHeight: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              boxShadow: (t) => `0 6px 20px ${step.color}22`,
              border: `4px solid ${step.color}11`,
              flexShrink: 0,
            }}
            aria-hidden
          >
            <Box sx={{ color: step.color }}>{step.Icon}</Box>
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="div" sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography sx={{ fontWeight: 700, color: "#111", mr: 1, fontSize: "1rem" }}>{`${step.id}.`}</Typography>
              <Typography sx={{ fontWeight: 700, color: "#111", fontSize: "1rem" }}>{step.title}</Typography>
            </Typography>

            <Typography sx={{ color: "#444", mt: 1, lineHeight: 1.5, fontSize: "0.92rem" }}>
              {step.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* connector dot on the timeline */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 28,
          [isLeft ? "right" : "left"]: -14,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#fff",
          border: `4px solid ${step.color}`,
          boxShadow: (t) => `0 6px 18px ${step.color}22`,
        }}
        aria-hidden
      />
    </Box>
  );
};

const ValueFlowAlternate: React.FC<Props> = ({ steps = defaultSteps, title = "O Ciclo de Valor do Ecossistema", subtitle = "Do apoio inicial ao crescimento sustentável e reinvestimento contínuo." }) => {
  return (
    <MDBox sx={{ width: "100%", py: { xs: 6, md: 8 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 3, md: 0 } }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <MDTypography variant="h5" fontWeight="bold" color="dark">{title}</MDTypography>
          <MDTypography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{subtitle}</MDTypography>
        </Box>

        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 2,
              transform: "translateX(-50%)",
              bgcolor: "divider",
              opacity: 0.12,
              borderRadius: 2,
              display: { xs: "none", md: "block" },
            }}
            aria-hidden
          />

          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            {steps.map((s, idx) => {
              const side = idx % 2 === 0 ? "left" : "right";
              return (
                <Box key={s.id} sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <StepItem step={s} side={side as "left" | "right"} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
};

export default ValueFlowAlternate;
