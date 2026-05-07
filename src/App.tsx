import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Link, Outlet } from 'react-router';



function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth="lg">

          <AppBar position='static' enableColorOnDark color="inherit" >
            <Toolbar >
              <Typography variant='h6'>Personal Trainer</Typography>
            </Toolbar>
            <Stack direction={"row"} spacing={4} margin={2}>
              <Link to={""}>Trainings</Link>
              <Link to={"customers"}>Customers</Link>
              <Link to={"calendar"}>Calendar</Link>
              <Link to={"stats"}>Stats</Link>
            </Stack>
          </AppBar>

          <Outlet />
          <CssBaseline />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
