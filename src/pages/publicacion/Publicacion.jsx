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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography,FormControlLabel } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

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
    const [quiz,setQuiz] = useState ({
        alternativa:""
    })

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
    
    

    const GuardarDatos = async () => {

        if (!Referencia.current?.files[0]) {
            alert("Debes seleccionar un archivo de video.");
            return;
        }
    
        const enviar = new FormData();
    
      
        enviar.append("titulo", formData.titulo);
        enviar.append("descripcion", formData.descripcion);
        enviar.append("area", formData.area);
        enviar.append("duracion", formData.duracion);
        enviar.append("fechaPublica", formData.fechaPublica ? dayjs(formData.fechaPublica).format("YYYY-MM-DD") : "");
        enviar.append("fechaCierre", formData.fechaCierre ? dayjs(formData.fechaCierre).format("YYYY-MM-DD") : "");
        enviar.append("certificado", formData.certificado);
        enviar.append("cursoLibre", formData.cursoLibre);
        enviar.append("evaluacion", formData.evaluacion);
        enviar.append("obligatorio", formData.obligatorio);
        
      
        enviar.append("video", Referencia.current.files[0]);

    
        try {
            const response = await fetch("http://localhost:3001/cursos", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: enviar,
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
      

    const guardarEvaluacion = async () => {

        
    }

    
    const [alternativas, setAlternativas] = useState([]);
      
    const añadirAlternativa = () => {
        if (alternativas.length < 4) {
          setAlternativas([...alternativas, { texto: "", seleccionada: false }]);
        }
      };
    
      const actualizar = (index, event) => {
        const nuevasAlternativas = [...alternativas];
        nuevasAlternativas[index].texto = event.target.value;
        setAlternativas(nuevasAlternativas);
      };
    
      const filaCheckbox = (index) => {
        const nuevasAlternativas = [...alternativas];
        nuevasAlternativas[index].seleccionada = !nuevasAlternativas[index].seleccionada;
        setAlternativas(nuevasAlternativas);
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
                            {videoSrc && (
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
                                <Button variant="contained" onClick={GuardarDatos}>Guardar</Button>
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
                                    <TextField id="filled-basic"  label="Titulo" variant="filled" name='pregunta'/>
                                    <br />
                                    <br />
                                    <div className='agregar'>
                                        
                                        <div>
                                           <Fab size="medium" className='alternativa' name='alternativa' color="primary" aria-label="add" onClick={añadirAlternativa} disabled={alternativas.length >= 4}>
                                            <AddIcon />
                                            </Fab> 
                                        </div>
                                        <div>
                                        {alternativas.length >= 4 && (
                                            <Typography color="error" variant="body2">
                                            Límite de alternativas alcanzado
                                            </Typography>
                                        )}
                                        
                                            {alternativas.map((alt, index) => (
                                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                                        <TextField
                                                label={`Alternativa ${index + 1}`}
                                                value={quiz.alternativa}
                                                onChange={(event) => actualizar(index, event)}
                                                variant="filled"
                                                fullWidth
                                            />
                                            <FormControlLabel
                                                control={
                                                <Checkbox
                                                    checked={alt.seleccionada}
                                                    onChange={() => filaCheckbox(index)}
                                                />
                                                }
                                                label=""
                                            />
                                        </div>
                                        
                                    ))}
                                    <div >
                                         <Button variant="outlined" size="medium" onClick={guardarEvaluacion}>
                                         Guardar
                                        </Button>
                                    </div>
                                   
                                        </div>
                                    
                                    </div>
                                    
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