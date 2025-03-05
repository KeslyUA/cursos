// src/components/Login.js
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
import { colors } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login({ open, onClose }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Iniciar sesión"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 3, width: '23ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
                required
                id="usuario"
                label="Usuario"
            />
            <br />
           <TextField
                id="contraseña"
                label="contraseña"
                type="password"
                autoComplete="current-password"
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:'#dd5b5b'}}>Cancelar</Button>
        <Button onClick={Ingresar}>Ingresar</Button>
      </DialogActions>
    </Dialog>
  );
}

function Ingresar () {
  usuario=document.getElementById('usuario');
  contraseña= document.getElementById('contraseña');

}
