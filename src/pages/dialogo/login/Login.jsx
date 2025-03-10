import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { login } from '../../../utils/auth';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function Login({ open, onClose,setIsAuthenticated  }) {
  const [usuario, setUsuario] = React.useState('');
  const [contraseña, setContraseña] = React.useState('');
  const [alerta, setAlerta] = React.useState(null);

  async function Ingresar() {
    if (!usuario || !contraseña) {
      setAlerta({ tipo: 'error', mensaje: 'Por favor, completa todos los campos.' });
      return;
    }

    try {
      const result = await login(usuario, contraseña);

      if (result.success) {
        setAlerta({ tipo: 'success', mensaje: 'Inicio de sesión exitoso. Redirigiendo...' });

        setTimeout(() => {
          setIsAuthenticated(true);
          onClose(); 
          window.location.href = "/publicacion";
        }, 2000);
      } else {
        setAlerta({ tipo: 'error', mensaje: result.message });
      }
    } catch (error) {
      setAlerta({ tipo: 'error', mensaje: 'Error en el servidor. Inténtalo más tarde.' });
      console.error('Error en la autenticación:', error);
    }
  }

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onClose}>
      <DialogTitle>{"Iniciar sesión"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 2, width: '27ch',height:'80px' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="usuario"
              label="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)} // Capturar input
            />
            <br />
            <TextField
              id="contraseña"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)} // Capturar input
            />
          </Box>
        </DialogContentText>

        {/* 🔹 Renderizar alerta si hay un mensaje */}
        {alerta && <Alert severity={alerta.tipo} >{alerta.mensaje}</Alert>}
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#dd5b5b' }}>Cancelar</Button>
        <Button id='ingresar' onClick={Ingresar}>Ingresar</Button>
      </DialogActions>
    </Dialog>
  );
}
