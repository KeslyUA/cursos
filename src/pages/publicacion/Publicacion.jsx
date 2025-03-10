import '../publicacion/publicacion.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { handleSubmit } from '../publicacion/guardar/Guardar';


const Publicacion = () => {
    const [video, setVideo] = useState(null);
    const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
        if (file) {
          const videoURL = URL.createObjectURL(file); // Crea una URL temporal
          setVideo(videoURL);
        }
      };
    
      const openFileDialog = () => {
        document.getElementById("videoInput").click();
      };
    return (
        <div>
             <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
                <div className="publicacion">
                    <div className="contenedor-publicacion">
                        <div className="conteiner-videos">
                        <div className='conf-sup'>
                            <div className='configuracion'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField fullWidth label="Titulo" id="Titulo" name='titulo' />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField fullWidth label="Descripcion" id="Descripcion" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField fullWidth label="Area" id="Area" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField fullWidth label="Duracion" id="Duracion" />
                        </Box>
                            </div>
                        
                        <div className='arreglo'>
                            <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Fecha Publica" id="Fecha Publica" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Fecha Cierre" id="Fecha Cierre" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Certificado" id="Certificado" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Curso Libre" id="Curso Libre" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Evaluacion" id="Evaluacion" />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                            <TextField fullWidth label="Obligatorio" id="Obligatorio" />
                        </Box>
                        </div>
                        
                        </div>
                        <div className='box-videos'>
                            <p>Video</p>
                            <div className='video'>
                        <div style={{ textAlign: "center", marginTop: "20px",width: "100%" }}>
                            <input
                                type="file"
                                id="videoInput"
                                accept="video/*"
                                style={{ display: "none" }}
                                onChange={handleFileSelect}
                            />
                            {video && (
                                <div style={{ marginTop: "20px", width: "100%", maxWidth: "600px", margin: "auto" }}>
                                <p>seleccionado:</p>
                                <video 
                                    controls 
                                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                                    >
                                    <source src={video} type="video/mp4" />
                                         Tu navegador no soporta videos.
                                    </video>
                                </div>
                            )}
                            </div>
                            </div>
                            <div className='box-boton'>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="success" onClick={openFileDialog}>Agregar</Button>
                                <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
                                <Button variant="contained" color="error">Eliminar</Button>
                            </Stack>
                            </div>
                        </div>
                    </div>
                    <div className="conteiner-agregar">
                        <p className='titulo-it'>Mis Publicaciones activas</p>

                    </div>
                    </div>
                    <div className='contenedor-inferior'>
                        <div className='evaluacion'>
                            <div className='pregunta'>

                            </div>
                            
                        </div>
                        <div className='participantes'>

                        </div>
                    </div>
                    
                </div>
                
            
        </div>
    )}
export default Publicacion    