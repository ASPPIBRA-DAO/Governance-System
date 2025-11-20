import { Box, Card, Typography } from "@mui/material";

// Definição da estrutura para um item do roadmap
interface TimelineItem {
  id: number;
  year: string;
  color: string;
  title: string;
  text: string;
}

interface Props {
  item: TimelineItem;
  isCentered: boolean;
}

function TimelineCard({ item, isCentered }: Props): JSX.Element {
  const neonGlow = `0 0 15px ${item.color}, 0 0 30px ${item.color}`;

  return (
    <Card
      sx={{
        background: "rgba(10, 15, 31, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "1rem",
        color: "white",
        p: 3,
        transition: "transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease",
        transform: isCentered ? "scale(1.12)" : "scale(0.9)",
        opacity: isCentered ? 1 : 0.5,
        boxShadow: isCentered ? neonGlow : "none",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ color: item.color, fontWeight: "bold" }}>
          {item.year}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: item.color, border: `1px solid ${item.color}`, borderRadius: "1rem", px: 1 }}
        >
          ID: {item.id}
        </Typography>
      </Box>
      <Box sx={{ height: "2px", background: item.color, mb: 2, boxShadow: neonGlow }} />
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {item.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ color: "rgba(255,255,255,0.7)" }}>
        {item.text}
      </Typography>
    </Card>
  );
}

export default TimelineCard;
