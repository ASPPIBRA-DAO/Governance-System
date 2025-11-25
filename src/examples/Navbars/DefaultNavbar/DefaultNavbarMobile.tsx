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
  const renderMobileNavbarItems = routes.map(({ name, route }) => {
    const isAnchor = route.startsWith("#");
    const commonSx = {
      py: 0.8,
      my: 0.2,
      display: "block",
      textDecoration: "none",
      color: "text.primary",
      fontSize: "1rem",
    };

    if (isAnchor) {
      return (
        <MDTypography
          key={name}
          component="a"
          href={route}
          fontWeight="regular"
          onClick={onClose}
          sx={commonSx}
        >
          {name}
        </MDTypography>
      );
    }

    return (
      <MDTypography
        key={name}
        component={Link}
        to={route || "#"}
        fontWeight="regular"
        onClick={onClose}
        sx={commonSx}
      >
        {name}
      </MDTypography>
    );
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 180,
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <MDBox p={1} mt={1} display="flex" flexDirection="column">
        {renderMobileNavbarItems}
      </MDBox>
    </Drawer>
  );
}

export default DefaultNavbarMobile;
