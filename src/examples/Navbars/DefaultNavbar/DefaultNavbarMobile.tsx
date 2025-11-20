import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

interface Props {
  open: boolean;
  onClose: () => void;
  routes: {
    name: string;
    route: string;
  }[];
}

function DefaultNavbarMobile({ open, onClose, routes }: Props): JSX.Element {
  const renderMobileNavbarItems = routes.map(({ name, route }) => (
    <MDTypography
      key={name}
      component={Link}
      to={route || "#"}
      variant="button"
      fontWeight="regular"
      onClick={onClose}
      sx={{
        py: 1.5,
        display: "block",
        textDecoration: "none",
        color: "text.primary",
      }}
    >
      {name}
    </MDTypography>
  ));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <MDBox p={2} mt={6} display="flex" flexDirection="column">
        {renderMobileNavbarItems}
      </MDBox>
    </Drawer>
  );
}

export default DefaultNavbarMobile;
