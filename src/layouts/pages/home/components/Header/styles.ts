import { Theme } from "@mui/material/styles";

export const header = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
});

export const brand = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  textDecoration: "none",
};

export const navLinksContainer = {
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  gap: 3,
  ml: 4,
};

export const navLink = (theme: Theme) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.text.primary,
  },
});
