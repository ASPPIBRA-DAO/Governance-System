
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Hook customizado para usar setInterval com React de forma segura
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ConstructionPopup: React.FC = () => {
  const [visible, setVisible] = useState(true);
  
  const calculateCountdown = () => {
    const launchDate = new Date("2024-12-01T00:00:00");
    const now = new Date();
    const difference = launchDate.getTime() - now.getTime();

    let countdown = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      countdown = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return countdown;
  };

  const [countdown, setCountdown] = useState(calculateCountdown());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este efeito só roda no cliente, prevenindo erro de hidratação
    setIsClient(true);
  }, []);

  useInterval(() => {
    setCountdown(calculateCountdown());
  }, 1000);

  if (!visible || !isClient) {
    return null;
  }

  return (
    <MDBox
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // z-index alto para ficar sobre tudo
      }}
    >
      <MDBox
        p={4}
        width="90%"
        maxWidth="500px"
        bgColor="white"
        borderRadius="lg"
        shadow="xl"
        textAlign="center"
      >
        <MDTypography variant="h3" fontWeight="bold" mb={2}>
          Site em Construção
        </MDTypography>
        <MDTypography variant="body1" mb={3}>
          Nosso site está recebendo uma grande atualização e estará de volta em breve!
        </MDTypography>
        <MDBox display="flex" justifyContent="center" mb={3}>
          <MDBox textAlign="center" px={2}>
            <MDTypography variant="h2" fontWeight="bold">
              {String(countdown.days).padStart(2, "0")}
            </MDTypography>
            <MDTypography variant="overline">Dias</MDTypography>
          </MDBox>
          <MDBox textAlign="center" px={2}>
            <MDTypography variant="h2" fontWeight="bold">
              {String(countdown.hours).padStart(2, "0")}
            </MDTypography>
            <MDTypography variant="overline">Horas</MDTypography>
          </MDBox>
          <MDBox textAlign="center" px={2}>
            <MDTypography variant="h2" fontWeight="bold">
              {String(countdown.minutes).padStart(2, "0")}
            </MDTypography>
            <MDTypography variant="overline">Minutos</MDTypography>
          </MDBox>
          <MDBox textAlign="center" px={2}>
            <MDTypography variant="h2" fontWeight="bold">
              {String(countdown.seconds).padStart(2, "0")}
            </MDTypography>
            <MDTypography variant="overline">Segundos</MDTypography>
          </MDBox>
        </MDBox>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => setVisible(false)}
        >
          Fechar
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default ConstructionPopup;
