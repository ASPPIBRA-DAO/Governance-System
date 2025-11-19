// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Container } from "@mui/material";

function FAQSection() {
  return (
    <MDBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <MDTypography variant="h2" gutterBottom>
          FAQ Section
        </MDTypography>
        <MDTypography variant="body1" color="text">
          Uma seção de perguntas frequentes. O conteúdo virá aqui.
        </MDTypography>
      </Container>
    </MDBox>
  );
}

export default FAQSection;
