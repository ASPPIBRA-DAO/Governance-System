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
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
      }}
    >
      <MDBox
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          color: "white",
          mb: 3,
        }}
      >
        {typeof icon === "string" ? <Icon fontSize="large">{icon}</Icon> : icon}
      </MDBox>
      <MDTypography variant="h5" mb={1}>
        {title}
      </MDTypography>
      <MDTypography variant="body2" color="secondary">
        {description}
      </MDTypography>
    </Card>
  );
}

export default InfoCard;
