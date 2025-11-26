import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";
import { useMaterialUIController } from "context";

function PricingCards({ prices }: { prices: string[] }): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [starter, premium, enterprise] = prices;
  return (
    <MDBox position="relative" zIndex={10} mt={8} px={{ xs: 1, sm: 0 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={4}>
          <MDBox
            borderRadius="1rem"
            sx={{
              border: darkMode ? "none" : "1px solid #E0E0E0",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                cursor: "pointer",
              },
            }}
          >
            <DefaultPricingCard
              color={darkMode ? "dark" : "white"}
              badge={{ color: darkMode ? "warning" : "light", label: "Starter" }}
              title="Acesso & Governança"
              description="A porta de entrada. Ideal para garantir sua identidade na DAO e armazenamento descentralizado básico."
              price={{ currency: "R$", value: starter, type: "" }}
              specifications={[
                { label: "Conta Digital em Blockchain", includes: true },
                { label: "10GB de Armazenamento IPFS", includes: true },
                { label: "Voto na Governança (DAO)", includes: true },
                { label: "Acesso Básico ao Ecossistema", includes: true },
                { label: "Relatórios de Análise Global", includes: false },
                { label: "Acesso a Projetos Incubados", includes: false },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: darkMode ? "warning" : "dark",
                label: "Criar Conta Agora",
              }}
              shadow={false}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={4}>
          <MDBox
            sx={{
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                cursor: "pointer",
              },
            }}
          >
            <DefaultPricingCard
              color="dark"
              badge={{ color: "info", label: "Premium" }}
              title="Investidor & Inteligência"
              description="O plano recomendado. Focado em quem busca informação privilegiada (Alpha) e oportunidades de negócio."
              price={{ currency: "R$", value: premium, type: "" }}
              specifications={[
                { label: "Tudo do plano Starter incluso", includes: true },
                { label: "50GB de Armazenamento IPFS", includes: true },
                { label: "Relatórios de Mercado Global", includes: true },
                { label: "Acesso a Projetos Incubados", includes: true },
                { label: "Integração Blockchain Nível 1", includes: true },
                { label: "API de Integração Avançada", includes: false },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: "info",
                label: "Assinar Premium",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={4}>
          <MDBox
            borderRadius="1rem"
            sx={{
              border: darkMode ? "none" : "1px solid #E0E0E0",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                cursor: "pointer",
              },
            }}
          >
            <DefaultPricingCard
              color={darkMode ? "dark" : "white"}
              badge={{ color: darkMode ? "warning" : "light", label: "Enterprise" }}
              title="Infraestrutura & Pioneirismo"
              description='Para "Whales", empresas ou quem precisa de infraestrutura pesada e prioridade máxima.'
              price={{ currency: "R$", value: enterprise, type: "" }}
              specifications={[
                { label: "Acesso Ilimitado", includes: true },
                { label: "200GB+ Armazenamento IPFS", includes: true },
                { label: "Early Access (Projetos Incubados)", includes: true },
                { label: "Integração Completa (API/Web3)", includes: true },
                { label: "Certificação NFT de Mantenedor", includes: true },
                { label: "Suporte Técnico Dedicado", includes: true },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: darkMode ? "warning" : "dark",
                label: "Acesso Total",
              }}
              shadow={false}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default PricingCards;
