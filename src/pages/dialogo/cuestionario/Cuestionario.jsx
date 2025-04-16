import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useState,useRef,useEffect } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import '../cuestionario/cuestionario.css';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeleteIcon from '@mui/icons-material/Delete';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({open,onClose,titulo,guardarEvaluacion}) {
    
  const [preguntas, setPreguntas] = useState([
    { titulo: '', alternativas: ['', '', '', ''] }
  ]);

  const añadirPregunta = () => {
    setPreguntas(prev => [...prev, { titulo: '', alternativas: ['', '', '', ''] }]);
  };

  const handlePreguntaChange = (index, value) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].titulo = value;
    setPreguntas(nuevasPreguntas);
  };

  const handleAlternativaChange = (preguntaIndex, alternativaIndex, value) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].alternativas[alternativaIndex] = value;
    setPreguntas(nuevasPreguntas);
  };
    
   
 
  return (
    <React.Fragment >
      
      <BootstrapDialog
        onClose={() => onClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Editar Cuestionario
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className='fondo-modal'>
            <p className='titulo'>Evaluacion de Curso {titulo}</p>
            {preguntas.map((pregunta, index) => (
              <div className='contenido' key={index}>
                <div className='linea-pre'>
                  <TextField
                    label={`Pregunta ${index + 1}`}
                    variant="filled"
                    className='itemtitulo'
                    value={pregunta.titulo}
                    onChange={(e) => handlePreguntaChange(index, e.target.value)}
                    fullWidth
                  /><DeleteIcon />
                </div>
                <div className='linea-alternativa'>
                  {pregunta.alternativas.map((alt, i) => (
                    <TextField
                      key={i}
                      label={`Alternativa ${i + 1}`}
                      variant="filled"
                      className='itemAlternativa'
                      value={alt}
                      onChange={(e) => handleAlternativaChange(index, i, e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className='boton-mas'>
            <Icon baseClassName="fas" className="fa-plus-circle" color="primary" onClick={añadirPregunta} style={{ cursor: 'pointer' }}></Icon>
            </div>
            
          </div>
          
          
        </DialogContent>
        <DialogActions>
        <Button variant="contained" size="medium" onClick={guardarEvaluacion} >
            Agregar
            </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
