import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DefaultNavbarMobile from "./DefaultNavbarMobile";
// Corrected logo path to the user's custom icon
const brandLogo = "/images/apple-touch-icon.png";

interface Props {
  routes: {
    name: string;
    route: string;
    [key: string]: any;
  }[];
  action?: {
    type: "external" | "internal";
    route: string;
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
    label: string;
  };
}

function DefaultNavbar({ routes, action }: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderNavbarItems = routes.map(({ name, route }) => {
    const isAnchor = route.startsWith("#");
    const commonSx = {
      mr: 3,
      textDecoration: "none",
      color: "text.primary",
      "&:hover": {
        color: ({ palette: { info } }: Theme) => info.main,
      },
    };

    if (isAnchor) {
      return (
        <MDTypography
          key={name}
          component="a"
          href={route}
          variant="button"
          fontWeight="regular"
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
        variant="button"
        fontWeight="regular"
        sx={commonSx}
      >
        {name}
      </MDTypography>
    );
  });

  return (
    <MDBox
      position="sticky"
      top={0}
      zIndex={50}
      py={1}
      sx={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "saturate(200%) blur(30px)",
      }}
    >
      <Container>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox
            component={Link}
            to="/"
            lineHeight={1}
            sx={{ textDecoration: "none", display: "flex", alignItems: "center" }}
          >
            <img src={brandLogo} alt="Custom Logo" height="40" />
            <MDTypography
              variant="button"
              fontWeight="bold"
              color="dark"
              sx={{ ml: 1, display: { xs: "none", sm: "inline-block" } }}
            >
              ASPPIBRA-DAO
            </MDTypography>
          </MDBox>
          <MDBox color="inherit" display={{ xs: "none", md: "flex" }} alignItems="center" mr={2}>
            {renderNavbarItems}
          </MDBox>
          <MDBox display="flex" alignItems="center">
            {action && (
              <MDBox display={{ xs: "none", md: "inline-block" }}>
                <MDButton
                  component={action.type === "internal" ? Link : "a"}
                  to={action.type === "internal" ? action.route : undefined}
                  href={action.type === "external" ? action.route : undefined}
                  target={action.type === "external" ? "_blank" : undefined}
                  rel={action.type === "external" ? "noreferrer" : undefined}
                  variant="contained"
                  color={action.color || "info"}
                  size="medium"
                >
                  {action.label}
                </MDButton>
              </MDBox>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <Icon>menu</Icon>
            </IconButton>
          </MDBox>
        </MDBox>
      </Container>
      <DefaultNavbarMobile routes={routes} open={mobileOpen} onClose={handleDrawerToggle} />
    </MDBox>
  );
}

DefaultNavbar.defaultProps = {};

export default DefaultNavbar;
