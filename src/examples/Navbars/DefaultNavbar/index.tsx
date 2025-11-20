import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DefaultNavbarMobile from "./DefaultNavbarMobile";

interface Props {
  routes: {
    name: string;
    route: string;
    [key: string]: any;
  }[];
  brand?: string;
  action?: {
    type: "external" | "internal";
    route: string;
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
    label: string;
  };
}

function DefaultNavbar({ routes, brand, action }: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderNavbarItems = routes.map(({ name, route }) => (
    <MDTypography
      key={name}
      component={Link}
      to={route || "#"}
      variant="button"
      fontWeight="regular"
      sx={{
        mr: 3,
        textDecoration: "none",
        color: "text.primary",
        "&:hover": {
          color: ({ palette: { info } }) => info.main,
        },
      }}
    >
      {name}
    </MDTypography>
  ));

  return (
    <MDBox
      position="sticky"
      top={0}
      zIndex={50}
      py={2}
      sx={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "saturate(200%) blur(30px)",
      }}
    >
      <Container>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox component={Link} to="/" lineHeight={1} sx={{ textDecoration: "none" }}>
            <MDTypography variant="button" fontWeight="bold" color="dark">
              {brand}
            </MDTypography>
          </MDBox>
          <MDBox
            color="inherit"
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            mr={2} // Margin to separate nav items from the button
          >
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
      <DefaultNavbarMobile
        routes={routes}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      />
    </MDBox>
  );
}

DefaultNavbar.defaultProps = {
  brand: "ASPPIBRA-DAO",
  action: false,
};

export default DefaultNavbar;
