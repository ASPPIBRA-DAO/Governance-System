"use client";

import React, { useState, useEffect } from "react";

// @mui material components
import { Card, CardContent, IconButton, Tooltip, CircularProgress, Fade } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

interface CardWithCodeProps {
  title: string;
  text: string;
  linkUrl: string;
  filePath: string;
}

function CardWithCode({ title, text, linkUrl, filePath }: CardWithCodeProps) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyMsg, setCopyMsg] = useState("Copiar");

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text();
      })
      .then((text) => {
        setCode(text);
      })
      .catch(() => {
        setCode(
          "// Erro ao carregar o código Solidity.\n// Verifique o console para mais detalhes."
        );
      })
      .finally(() => setLoading(false));
  }, [filePath]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopyMsg("Copiado!");
      setTimeout(() => setCopyMsg("Copiar"), 2000);
    });
  };

  return (
    <Card sx={{ height: "100%", backgroundColor: "#1A1A1A", border: "1px solid #30363D" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          p: 2.5,
        }}
      >
        <MDBox>
          <MDTypography variant="h5" color="white" fontWeight="bold" mb={1}>
            {title}
          </MDTypography>
          <MDTypography variant="body2" color="white" sx={{ opacity: 0.7 }}>
            {text}
          </MDTypography>
        </MDBox>

        <MDBox my={3} sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <MDBox
            px={2}
            py={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: "#161B22",
              borderBottom: "1px solid #30363D",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
            }}
          >
            <MDTypography variant="caption" color="white" sx={{ opacity: 0.6 }}>
              {filePath}
            </MDTypography>
            <Tooltip title={copyMsg} placement="top">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopy fontSize="small" sx={{ color: "#FFF", opacity: 0.6 }} />
              </IconButton>
            </Tooltip>
          </MDBox>
          <MDBox
            component="pre"
            sx={{
              flexGrow: 1,
              m: 0,
              p: 2,
              backgroundColor: "#0D1117",
              color: "#E6EDF3",
              fontFamily: '"Roboto Mono", monospace',
              fontSize: "0.875rem",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              borderBottomLeftRadius: "0.75rem",
              borderBottomRightRadius: "0.75rem",
            }}
          >
            {loading ? <CircularProgress size={20} color="info" /> : <code>{code}</code>}
          </MDBox>
        </MDBox>

        <Link to={linkUrl} target="_blank" style={{ textDecoration: "none" }}>
          <MDTypography variant="button" color="info" fontWeight="bold">
            Leia mais →
          </MDTypography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CardWithCode;
