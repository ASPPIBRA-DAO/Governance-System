// @mui material components
import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

interface CardWithImageProps {
  title: string;
  text: string;
  linkUrl: string;
  imageUrl: string;
}

function CardWithImage({ title, text, linkUrl, imageUrl }: CardWithImageProps) {
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

        <MDBox
          my={3}
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <MDBox
            component="img"
            src={imageUrl}
            alt={title}
            sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
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

export default CardWithImage;
