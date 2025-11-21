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
  return (
    <Card
      elevation={isCentered ? 6 : 1}
      sx={{
        borderRadius: "1rem",
        p: 3,
        transition: "transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease",
        transform: isCentered ? "scale(1.12)" : "scale(0.9)",
        opacity: isCentered ? 1 : 0.7,
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
      <Box sx={{ height: "2px", background: item.color, mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" mb={1} color="text.primary">
        {item.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {item.text}
      </Typography>
    </Card>
  );
}

export default TimelineCard;
