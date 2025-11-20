import { ReactNode } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

function InfoCard({ icon, title, description }: Props): JSX.Element {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h2" color="primary">
          {typeof icon === "string" ? <Icon fontSize="large">{icon}</Icon> : icon}
        </MDTypography>
        <MDTypography variant="h5" mt={2} mb={1}>
          {title}
        </MDTypography>
        <MDTypography variant="body2" color="text">
          {description}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default InfoCard;
