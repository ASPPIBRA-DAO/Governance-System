import { useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Custom styles for Header
import { header, brand, navLinksContainer, navLink } from "./styles";

const navLinksData = [
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#community", label: "Community" },
  { href: "#team", label: "Team" },
  { href: "#roadmap-carousel", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", mt: 4 }}>
      <Link to="#">
        <MDTypography variant="h6" sx={brand}>
          ASPPIBRA-DAO
        </MDTypography>
      </Link>
      <List>
        {navLinksData.map((link) => (
          <ListItem key={link.href} component="a" href={link.href}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={header}>
      <Toolbar>
        <MDBox component={Link} to="#" sx={brand}>
          {/* You can place an <img> tag here if you have a logo */}
          <MDTypography variant="h6" fontWeight="bold">
            ASPPIBRA-DAO
          </MDTypography>
        </MDBox>

        <MDBox sx={navLinksContainer}>
          {navLinksData.map((link) => (
            <MDTypography
              key={link.href}
              component="a"
              href={link.href}
              variant="button"
              fontWeight="regular"
              sx={navLink}
            >
              {link.label}
            </MDTypography>
          ))}
        </MDBox>

        <MDBox sx={{ flexGrow: 1 }} />

        <MDBox sx={{ display: { xs: "none", md: "block" } }}>
          <MDButton component={Link} to="/login" variant="gradient" color="info">
            Juntar-se
          </MDButton>
        </MDBox>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
