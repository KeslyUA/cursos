import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router';
import Login from '../dialogo/login/Login.jsx'; 
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Evaluacion from '../evaluacion/Evaluacion.jsx';

const paginasPublicas = [
  ['Explorar', 'explorar'], 
  ['Comunidad', 'comunidad'], 
  ['Novedades', 'novedades']
];

const paginasProtegidas={
  administrador: [
 
  ['Cursos','cursos'],
['Publicacion','publicacion'],
['Evaluacion','evaluacion']

],
usuario:[
  ['Cursos','cursos'],
  ['Evaluacion','evaluacion']
]};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [abrirLogin, setabrirLogin] = React.useState(false); 
  const [isAuthenticated, setIsAuthenticated] = React.useState( !!localStorage.getItem("token"));
  //cargo de persona para ocultar rutas
  const cargo = localStorage.getItem("cargo");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const abrirDialogoLogin = () => {
    setabrirLogin(true); 
  };

  const cerrarDialogoLogin = () => {
    setabrirLogin(false); 
  };
//funcion para cerrar sesion
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cargo");
    setIsAuthenticated(false);
    window.location.href = "/Explorar"; 
  };

  const navigate = useNavigate();

  const pages = isAuthenticated
  ? [...paginasPublicas, ...paginasProtegidas[cargo === "administrador" ? "administrador" : "usuario"]]
  : paginasPublicas;
  return (
    <React.Fragment>
      <AppBar position="static" sx={{backgroundColor:'#1d1542cc'}}>              
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HomeIcon fontSize="small" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color:'#16eca5cc'}} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#16eca5cc',
                textDecoration: 'none',
              }}
            >
              SEPCON
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page[1]} onClick={() =>{
                    navigate(`/${page[1]}`);
                    handleCloseNavMenu(); 
                  }}>
                    
                      <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
                    
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SEPCON
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { navigate(`/${page[1]}`); }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page[0]}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <Button
                variant="outlined"
                sx={{ color: 'white', borderColor: '#e93b1dcc', backgroundColor: '#e93b1dcc' }}
                onClick={cerrarSesion}
              >
              Cerrar sesión
              </Button>
           ) : (
              <Button
                variant="outlined"
                sx={{ color: 'white', borderColor: '#2254facc', backgroundColor: '#1046f5cc' }}
                onClick={abrirDialogoLogin}
              >
                Iniciar sesión
              </Button>
             )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={abrirLogin} onClose={cerrarDialogoLogin} setIsAuthenticated={setIsAuthenticated}  />
    </React.Fragment>
  );
}

export default ResponsiveAppBar;
