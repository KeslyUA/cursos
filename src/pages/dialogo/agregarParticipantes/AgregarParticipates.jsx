import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from "react";
import '../agregarParticipantes/agregarParticipantes.css';
import Checkbox from '@mui/material/Checkbox';

import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AgregarParticipantes({open,onClose,onSeleccionarParticipantes}) {
  

    const [participantes,setParticipantes] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    
    useEffect(() => {
     //obtener participantes
     const obtenerParticipantes = async () =>{
        try {
            const response = await fetch("http://localhost:3001/participantes", {
              method: "GET",
              headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error("Error al obtener los participantes");
            }
    
            const data = await response.json();
            setParticipantes(data);
          } catch (error) {
            console.error("Error:", error);
          }
    }    

    if (open){
        
            obtenerParticipantes();
          }
        }, [open]);

        const manejarSeleccion = (id) => {
            setSeleccionados((prev) =>
                prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
            );
        };
    
        //guardar participantes
        const agregarSeleccionados = async () => {
          const seleccionadosDetalles = participantes.filter((p) => seleccionados.includes(p.id));
      
          try {
              const response = await fetch('http://localhost:3001/participantesAgregados', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    participantes: seleccionadosDetalles}),
              });
      
              const data = await response.json();
              
      
              onSeleccionarParticipantes(seleccionadosDetalles);
              onClose();
          } catch (error) {
              console.error('Error al guardar los participantes:', error);
          }
      };
      
  return (
    
      <BootstrapDialog
        onClose={() => onClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, width:'30vh'}} id="customized-dialog-title">
          Añadir Participantes
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
            <div className='participantes-lista'>
                {participantes.length > 0 ? (
                    participantes.map((p) => (
                        <div key={p.id}>
                            <Checkbox
                                checked={seleccionados.includes(p.id)}
                                onChange={() => manejarSeleccion(p.id)}
                            />
                            {p.usuario}
                        </div>
                    ))
                ) : (
                    <p>Cargando participantes...</p>
                )}
            </div>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={agregarSeleccionados} color="primary">Agregar</Button>
            </DialogActions>
      </BootstrapDialog>
   
  );
}
