import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';

interface Props {}

const appBarHeight = '64px';

const Wrapper = styled('main')(() => ({
  padding: '20px 50px',
  height: `calc(100vh - ${appBarHeight})`,
}));

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const redirect = () => navigate('/');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ height: appBarHeight }}>
        <Toolbar onClick={redirect}>
          <Typography variant="h6" color="inherit" noWrap>
            Canal + test
          </Typography>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Wrapper>
    </Box>
  );
};

export default Layout;
