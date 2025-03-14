import '../publicacion/publicacion.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState,useRef,useEffect } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const Publicacion = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoURL, setVideoURL] = useState(null);
    const Referencia= useRef(null)
    const [misCursos,setMisCursos] =useState([])
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        area: "",
        duracion: "",
        fechaPublica: "",
        fechaCierre: "",
        certificado: "",
        cursoLibre: "",
        evaluacion: "",
        obligatorio: "",
        setVideoURL:""
    });

    //este
    const abrirDialogoArchivo =()=>{
    
        Referencia.current.click();
    }

    const cambioArchivo=(event)=>{
        const archivo = event.target.files[0];
        if (!archivo) return;
    
        console.log("Archivo seleccionado:", archivo);
    
        const nuevaURL = URL.createObjectURL(archivo);
        setVideoSrc(nuevaURL); 
        setVideoURL(archivo);
    }


     const videoPrevio = new FormData();
      videoPrevio.append("videoURL",videoURL);


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    

    const handleGuardar = async () => {

        if (!Referencia.current?.files[0]) {
            alert("Debes seleccionar un archivo de video.");
            return;
        }
    
        const formDataToSend = new FormData();
    
      
        formDataToSend.append("titulo", formData.titulo);
        formDataToSend.append("descripcion", formData.descripcion);
        formDataToSend.append("area", formData.area);
        formDataToSend.append("duracion", formData.duracion);
        formDataToSend.append("fechaPublica", formData.fechaPublica ? dayjs(formData.fechaPublica).format("YYYY-MM-DD") : "");
        formDataToSend.append("fechaCierre", formData.fechaCierre ? dayjs(formData.fechaCierre).format("YYYY-MM-DD") : "");
        formDataToSend.append("certificado", formData.certificado);
        formDataToSend.append("cursoLibre", formData.cursoLibre);
        formDataToSend.append("evaluacion", formData.evaluacion);
        formDataToSend.append("obligatorio", formData.obligatorio);
        
      
        formDataToSend.append("video", Referencia.current.files[0]);

    
        try {
            const response = await fetch("http://localhost:3001/cursos", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: formDataToSend,
            });
    
            if (!response.ok) {
                const errorResponse = await response.json(); 
                console.error("Error del servidor:", errorResponse);
                throw new Error("Error al guardar el curso");
            }
    
            const data = await response.json();
            console.log("Curso guardado correctamente:", data);
    
            obtenerPublicacionPorUsuario(); 
            setFormData({
                titulo: "",
                descripcion: "",
                area: "",
                duracion: "",
                fechaPublica: "",
                fechaCierre: "",
                certificado: "",
                cursoLibre: "",
                evaluacion: "",
                obligatorio: "",
            });
            

            setVideoSrc(null);
            Referencia.current.value = ""; 
    
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };
    
   const obtenerPublicacionPorUsuario = async () => {
          try {
            const response = await fetch("http://localhost:3001/publicaciones", {
              method: "GET",
              headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error("Error al obtener los cursos");
            }
    
            const data = await response.json();
            setMisCursos(data);
          } catch (error) {
            console.error("Error:", error);
          }
        };
    //para obtener lista de publicaciones

    useEffect(() => {
        
    
        obtenerPublicacionPorUsuario();
      }, []);
      
    

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
                                <br />
                                    
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                        <TextField fullWidth label="Titulo" id="Titulo" name='titulo' value={formData.titulo} onChange={handleChange} />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Descripcion" id="Descripcion" name='descripcion' value={formData.descripcion} onChange={handleChange} />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Area" id="Area" name='area' value={formData.area} onChange={handleChange}/>
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Duracion" id="Duracion" name='duracion' value={formData.duracion} onChange={handleChange} />
                                        </Box>
                                            </div>
                                        
                                        <div className='arreglo'>
                                        
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha Publica"
                                                value={formData.fechaPublica ? dayjs(formData.fechaPublica) : null}
                                                onChange={(newValue) =>
                                                setFormData({
                                                    ...formData,
                                                    fechaPublica: newValue ? newValue.format("YYYY-MM-DD") : ""
                                                })
                                                }
                                                sx={{ width: 500, maxWidth: '40%' }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha Cierre"
                                                value={formData.fechaCierre ? dayjs(formData.fechaCierre) : null}
                                                onChange={(newValue) =>
                                                setFormData({
                                                    ...formData,
                                                    fechaCierre: newValue ? newValue.format("YYYY-MM-DD") : ""
                                                })
                                                }
                                                sx={{ width: 500, maxWidth: '40%' }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                            <TextField fullWidth label="Certificado" id="Certificado" name='certificado' value={formData.certificado} onChange={handleChange}/>
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                            <TextField fullWidth label="Curso Libre" id="CursoLibre" name='cursoLibre' value={formData.cursoLibre} onChange={handleChange}/>
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                            <TextField fullWidth label="Evaluacion" id="Evaluacion" name='evaluacion' value={formData.evaluacion} onChange={handleChange} />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                            <TextField fullWidth label="Obligatorio" id="Obligatorio" name='obligatorio' value={formData.obligatorio} onChange={handleChange}/>
                                        </Box>
                                        
                                  
                                        
                        </div>
                        
                        </div>
                        <div className='box-videos'>
                            <p>Video</p>
                            <div className='video'>
                        <div style={{ textAlign: "center", marginTop: "20px",width: "100%" }}>
                            <input
                                type="file"
                                ref={Referencia}
                                id="videoInput"
                                accept="video/*"
                                style={{ display: "none" }}
                                onChange={cambioArchivo}
                            />
                            {videoSrc && (console.log("url",videoSrc),
                                <div style={{ marginTop: "20px", width: "100%", maxWidth: "600px", margin: "auto" }}>
                                <p>seleccionado:</p>
                                 <video 
                                    key={videoSrc}
                                    controls 
                                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                                    >
                                    <source src={videoSrc} type="video/mp4" />
                                         Tu navegador no soporta videos.
                                    </video> 


                                    {/* <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title="YouTube Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: "10px" }}
                                    ></iframe> */}
                                </div>
                            )}
                            </div>
                            </div>
                           {/*  <div className='url'>
                                 <Box sx={{ width: '100%', maxWidth: '100%' }}>
                                            <TextField fullWidth label="url del video" id="videoURL" name='videoURL' value={formData.videoURL} onChange={handleChange}/>
                                </Box>
                            </div> */}
                            
                           
                            <div className='box-boton'>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="success" onClick={abrirDialogoArchivo}>Agregar</Button>
                                <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
                                <Button variant="contained" color="error">Eliminar</Button>
                            </Stack>
                            </div>
                        </div>
                    </div>
                    <div className="conteiner-agregar">
                        <p className='text-pregunta' style={{color:'white',fontSize:'20px'}}>Mis Publicaciones activas</p>

                        <div className='div-publicacion'>
                          {misCursos.map((curso) => {
                            
                                return (    
                                <li className='publicaciones-activa' key={curso.id} >
                                    <ul>{curso.titulo}</ul>
                                </li>
                                );
                         })}  
                        </div>
                         
                         
                    </div>

                    </div>
                    <div className='contenedor-inferior'>
                        <div className='evaluacion'>
                            <style>
                            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
                            </style>

                            <p className='text-pregunta'>Evaluacion</p>
                            <div className='pregunta'>
                                <p className='text-pregunta'>Pregunta N° 1</p>
                                <div className='alternativas'>
                                    <TextField id="standard-basic" label="Titulo" variant="standard" />
                                    <br />
                                    <br />
                                    <TextField id="standard-basic" label="Alternativa 1" variant="standard" />
                                    <TextField id="standard-basic" label="Alternativa 2" variant="standard" />
                                    <TextField id="standard-basic" label="Alternativa 3" variant="standard" />
                                    <TextField id="standard-basic" label="Alternativa 4" variant="standard" />    
                                </div>
                               

                            </div>
                            
                        </div>
                        <div className='participantes'>
                            <p className='text-pregunta'>Participantes</p>
                        </div>
                    </div>
                    
                </div>
                
            
        </div>
    )}
export default Publicacion    