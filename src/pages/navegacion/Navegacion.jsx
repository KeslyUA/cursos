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

const pages = [
  ['Explorar', 'explorar'], 
  ['Comunidad', 'comunidad'], 
  ['Novedades', 'novedades'],
  ['Publicacion','publicacion']
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false); 
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true); 
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false); 
  };

  const navigate = useNavigate();

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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NavLink to="/" end>
                      <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
                    </NavLink>
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
    <Tooltip title="Perfil">
      <IconButton sx={{ p: 0 }}>
        <Avatar alt="Usuario" src="/static/images/avatar/2.jpg" />
      </IconButton>
    </Tooltip>
  ) : (
    <Button variant="outlined" sx={{ color: 'white', borderColor: '#2254facc',backgroundColor:'#1046f5cc' }} onClick={handleOpenLoginDialog}>
      Iniciar sesión
    </Button>
  )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={openLoginDialog} onClose={handleCloseLoginDialog} setIsAuthenticated={setIsAuthenticated}  />
    </React.Fragment>
  );
}

export default ResponsiveAppBar;
