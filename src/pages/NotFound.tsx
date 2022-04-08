import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

interface Props {}

const NotFound: React.FC<Props> = () => {
  const navigate = useNavigate();

  const redirect = () => navigate('/');
  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography>Cette ressource n'existe pas</Typography>
      <Button variant="contained" onClick={redirect}>
        Retour à l'accueil
      </Button>
    </Grid>
  );
};

export default NotFound;
