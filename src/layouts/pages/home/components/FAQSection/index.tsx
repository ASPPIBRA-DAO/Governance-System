import {
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const faqData = [
  // --- COLUNA 1: INSTITUCIONAL E JURÍDICO ---
  {
    id: "inst-1",
    question: "O que é juridicamente a ASPPIBRA?",
    answer:
      "É uma associação civil de direito privado, sem fins lucrativos, que pode adotar a denominação ASPPIBRA-DAO para fins de governança digital e atuação em ecossistemas tecnológicos.",
  },
  {
    id: "inst-2",
    question: "Quem pode se associar?",
    answer:
      "Qualquer pessoa física ou jurídica, proprietária ou possuidora de imóvel no Brasil, que seja idônea e se comprometa com os objetivos estatutários da associação.",
  },
  {
    id: "inst-3",
    question: "Existe risco de responsabilidade pessoal por dívidas?",
    answer:
      "Não. O Estatuto define expressamente que os associados não respondem, nem solidária nem subsidiariamente, pelas obrigações financeiras ou civis da associação.",
  },
  {
    id: "inst-4",
    question: "Qual é o objetivo principal da organização?",
    answer:
      "Promover o direito à moradia e à propriedade através do fomento à regularização fundiária (REURB), garantindo segurança jurídica e função social da propriedade.",
  },
  {
    id: "inst-5",
    question: "A associação visa lucro?",
    answer:
      "Não. Todos os recursos são aplicados integralmente na manutenção e desenvolvimento dos objetivos sociais, sendo vedada a distribuição de lucros ou dividendos aos associados.",
  },

  // --- COLUNA 2: TECNOLOGIA E CAD (O TOKEN) ---
  {
    id: "tech-1",
    question: "O que é a Credencial de Associado Digital (CAD)?",
    answer:
      "É um registro digital intransferível em blockchain que serve exclusivamente como identificação do associado e habilitação para voto nas assembleias.",
  },
  {
    id: "tech-2",
    question: "A CAD é um investimento financeiro?",
    answer:
      "Não. A CAD não configura valor mobiliário e não confere qualquer direito econômico ou expectativa de lucro, servindo apenas para governança interna.",
  },
  {
    id: "tech-3",
    question: "Posso vender ou transferir minha credencial?",
    answer:
      "Não. A CAD é de titularidade pessoal e intransferível. Qualquer tentativa de venda ou negociação é nula e pode resultar na exclusão do associado.",
  },
  {
    id: "tech-4",
    question: "O que acontece com a CAD se eu sair da associação?",
    answer:
      "Em caso de demissão ou exclusão, a Credencial Digital é imediatamente cancelada e invalidada no sistema, perdendo qualquer função de acesso ou voto.",
  },
  {
    id: "tech-5",
    question: "Como a tecnologia Blockchain é utilizada?",
    answer:
      "É usada para governança digital, garantindo transparência, segurança no voto e registro imutável de participação, seguindo normas internas e a LGPD.",
  },

  // --- COLUNA 3: ATUAÇÃO, DIREITOS E DEVERES ---
  {
    id: "act-1",
    question: "Há custos para participar?",
    answer:
      "Sim. Os associados devem manter-se adimplentes com as contribuições definidas em Assembleia para sustentar a estrutura e os projetos da associação.",
  },
  {
    id: "act-2",
    question: "Quais são os benefícios diretos do associado?",
    answer:
      "Direito a voto nas assembleias, acesso a conteúdos exclusivos, participação em projetos de regularização e prova criptográfica de participação em cursos.",
  },
  {
    id: "act-3",
    question: "A associação atua na área ambiental?",
    answer:
      "Sim. Uma das finalidades é promover a sustentabilidade, executando projetos de recuperação de áreas degradadas e incentivando a bioeconomia.",
  },
  {
    id: "act-4",
    question: "O que é a mediação de conflitos oferecida?",
    answer:
      "É um instrumento de atuação onde a ASPPIBRA presta assessoria especializada para resolver disputas fundiárias e possessórias de forma extrajudicial.",
  },
  {
    id: "act-5",
    question: "De quem é a propriedade intelectual dos projetos?",
    answer:
      "Todos os ativos, softwares e criações desenvolvidos no âmbito da associação pertencem exclusivamente à ASPPIBRA, garantindo o patrimônio coletivo.",
  },
];

// Função para dividir em 3 colunas
function splitIntoColumns(data: any[], columns = 3) {
  const perColumn = Math.ceil(data.length / columns);
  return Array.from({ length: columns }, (_, i) =>
    data.slice(i * perColumn, (i + 1) * perColumn)
  );
}

function FAQSection(): JSX.Element {
  const theme = useTheme();
  const columns = splitIntoColumns(faqData, 3);

  return (
    // CORREÇÃO: Removido o bgColor="white" para herdar o fundo da página
    <MDBox component="section" py={10} id="faq">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign="center" mb={6}>
            <MDTypography variant="h3" fontWeight="bold" color="dark">
              Perguntas Frequentes
            </MDTypography>
            <MDTypography variant="body2" color="text" mt={1}>
              Entenda os aspectos jurídicos, técnicos e sociais da ASPPIBRA.
            </MDTypography>
          </Grid>

          {/* GRID DE 3 COLUNAS */}
          <Grid container spacing={3} alignItems="flex-start">
            {columns.map((column, colIndex) => (
              <Grid key={colIndex} item xs={12} md={4}>
                {column.map((item) => (
                  <Accordion
                    key={item.id}
                    sx={{
                      mb: 2,
                      backgroundColor: "#fff", // Fundo dos cards branco
                      color: "#344767",
                      borderRadius: "10px",
                      boxShadow: theme.shadows[1],
                      "&:before": { display: "none" },
                      "&:hover": {
                        boxShadow: theme.shadows[3],
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#344767" }} />}>
                      <MDTypography variant="h6" fontWeight="bold" color="dark" fontSize="0.95rem">
                        {item.question}
                      </MDTypography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <MDTypography variant="body2" color="text" lineHeight={1.5} fontSize="0.85rem">
                        {item.answer}
                      </MDTypography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default FAQSection;
