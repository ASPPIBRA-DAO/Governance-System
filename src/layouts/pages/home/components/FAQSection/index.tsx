import { Container, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const faqData = [
  {
    id: "item-1",
    question: "O que é uma DAO?",
    answer:
      "Uma Organização Autônoma Descentralizada (DAO) é uma entidade governada por regras codificadas em uma blockchain e controlada por seus membros. Isso permite a tomada de decisão coletiva sem uma autoridade central, garantindo transparência e imutabilidade.",
  },
  {
    id: "item-2",
    question: "Como posso participar?",
    answer:
      "A participação na governança da DAO requer a posse do token de governança (ASPB). Com ele, você pode criar e votar em propostas que moldam o futuro do projeto.",
  },
  {
    id: "item-3",
    question: "Onde posso comprar o token ASPB?",
    answer:
      "O token ASPB pode ser adquirido em exchanges descentralizadas como Uniswap e Sushiswap. Planos para listagem em exchanges centralizadas serão anunciados futuramente.",
  },
];

function FAQSection(): JSX.Element {
  return (
    <MDBox component="section" py={8} id="faq">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: "center", mb: 4 }}>
            <MDTypography variant="h3" fontWeight="bold">
              Perguntas Frequentes
            </MDTypography>
          </Grid>
          <Grid item xs={12} md={10}>
            {faqData.map((item) => (
              <Accordion key={item.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6">{item.question}</MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDTypography variant="body2" color="text">
                    {item.answer}
                  </MDTypography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default FAQSection;
