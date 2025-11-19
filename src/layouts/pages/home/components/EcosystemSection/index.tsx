// Material-UI Components
import { Box, Typography } from '@mui/material';

function EcosystemSection() {
  return (
    <Box sx={{ p: 4, my: 4, backgroundColor: 'grey.200' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Nosso Ecossistema
      </Typography>
      <Typography variant="body1">
        Em breve, a descrição detalhada do nosso ecossistema estará disponível aqui.
      </Typography>
    </Box>
  );
};

export default EcosystemSection;
