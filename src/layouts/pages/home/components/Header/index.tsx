// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function HomeHeader() {
  return (
    <MDBox
      bgColor="info"
      color="white"
      p={2}
      mb={2}
      shadow="md"
      textAlign="center"
      borderRadius="md"
    >
      <MDTypography variant="h4" color="white" fontWeight="bold">
        Meu Novo Cabeçalho da Home
      </MDTypography>
      <MDTypography variant="body2" color="white" mt={1}>
        Você pode customizar este componente em: src/layouts/pages/home/components/Header/index.tsx
      </MDTypography>
    </MDBox>
  );
}

export default HomeHeader;
