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
import AgregarParticipantes from '../dialogo/agregarParticipantes/AgregarParticipates';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';

import Radio from '@mui/material/Radio';
import agregarSeleccionados from '../dialogo/agregarParticipantes/AgregarParticipates'

const Publicacion = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoURL, setVideoURL] = useState(null);
    const Referencia= useRef(null);
    const [misCursos,setMisCursos] =useState([]);
    const [abrirDialogo, setabrirDialogo] = React.useState(false);
    const [participantesSeleccionados, setParticipantesSeleccionados] = useState([]);
    const [alternativas, setAlternativas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [evaluaciones, setEvaluaciones] = useState([]);

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        area: "",
        duracion: "",
        fechaPublica: "",
        fechaCierre: "",
        certificado: 0,
        cursoLibre: 0,
        evaluacion: 0,
        obligatorio:0,
        setVideoURL:""
    });console.log("cur",formData)

    const selectorCurso = (curso) => {
        setFormData({
            id:curso.id,
            titulo: curso.titulo,
            descripcion: curso.descripcion,
            area: curso.area,
            duracion: curso.duracion,
            fechaPublica: curso.fechaPublica,
            fechaCierre: curso.fechaCierre,
            certificado: curso.certificado,
            cursoLibre: curso.cursoLibre,
            evaluacion: curso.evaluacion,
            obligatorio: curso.obligatorio,
            setVideoURL:curso.videoURL
        });
    };
    const [quiz,setQuiz] = useState ({
        titulo:"",
        alternativa:[],
    });
    const abrirDialogoParticipantes = () => {
        setabrirDialogo(true); 
      };

      const cerrarDialogo = () => {
        setabrirDialogo(false); 
      };
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
            setCargando(true);
            const response = await fetch("http://localhost:3001/cursos", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: enviar,
            });
    
            const data = await response.json();
            alert("se guardo correctamente",data)

            if(data.id){
                await guardarParticipantes(data.id);
                await guardarEvaluacion(data.id);
            }
            
            obtenerPublicacionPorUsuario(); 
            setFormData({
                titulo: "",
                descripcion: "",
                area: "",
                duracion: "",
                fechaPublica: "",
                fechaCierre: "",
                certificado:0,
                cursoLibre: 0,
                evaluacion: 0,
                obligatorio: 0,
            });
            

            setVideoSrc(null);
            Referencia.current.value = ""; 
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }finally{
            setCargando(false)
        }
    };
    // guaradar participantes
     
    const guardarParticipantes = async (idCurso) =>{

        try{
            if (!idCurso) {
                console.error("Error: idCurso es undefined");
                return;
            }
            const participantesElegidos = participantesSeleccionados.map(p =>({idUsuario: p.id}) );

            const response =await fetch("http://localhost:3001/participantesAgregados",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantes: participantesElegidos, idCurso }),
            });
            if (response.ok) {
                setParticipantesSeleccionados([]);
            }

        }catch(error){
            console.error("Error al guardar los participantes:", error);
        }
    }
    //eliminar publicacion

    const eliminarCurso = async () => {
        if (!formData.titulo) {
            alert("Selecciona un curso antes de eliminar.");
            return;
        }
    
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este curso?");
        if (!confirmacion) return;
    
        try {
            const response = await fetch(`http://localhost:3001/cursos/${formData.id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Curso eliminado correctamente");
                setMisCursos(misCursos.filter((curso) => curso.id !== formData.id));

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
                    obligatorio: ""
                });
            } else {
                alert("Error al eliminar el curso");
            }
        } catch (error) {
            console.error("Error:", error);
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

    //guardar evaluacion
    const guardarEvaluacion = async (idCurso) => {
        try {
          
            const response = await fetch("http://localhost:3001/evaluaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({
                    titulo: quiz.titulo,
                    idCurso,
                    alternativas: alternativas
                })
            });
            const data = await response.json();
            
            
            if (response.ok) {
                setEvaluaciones(preEvaluaciones=>[...preEvaluaciones,data]);
                
                setQuiz({ titulo: "" }); 
                setAlternativas([]);
            }
    
        } catch (error) {
            console.error("Error al guardar evaluación:", error);
        }
    };
        

    //para obtener lista de publicaciones

    useEffect(() => {
        
    
        obtenerPublicacionPorUsuario();
       
      }, []);
      

      
    const añadirAlternativa = () => {
        if (alternativas.length < 4) {
          setAlternativas([...alternativas, { texto: "", seleccionada: false }]);
        }
      };
    
      const actualizaralternativa = (index, event) => {
        const nuevasAlternativas = [...alternativas];
        nuevasAlternativas[index].texto = event.target.value;
        setAlternativas(nuevasAlternativas);
      };
    
      const filaCheckbox = (indexSeleccionado) => {
        const nuevasAlternativas = alternativas.map((alt, index) => ({
          ...alt,
          seleccionada: index === indexSeleccionado, 
        }));
        setAlternativas(nuevasAlternativas);
      };
      

      const funcionchance = (event)=>{
        setQuiz({ ...quiz, [event.target.name]: event.target.value });

      };

      const eliminarItem = (id) => {
        setParticipantesSeleccionados(participantesSeleccionados.filter(item => item.id !== id));
      };


    return (
        <div>
             <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
                <div className="publicacion">
                    <div className='carga'>
                      {cargando && <CircularProgress size="3rem"/> } 
                    </div>
                     
                    <div className="contenedor-publicacion">
                       
                        <div className="conteiner-videos">
                        <div className='conf-sup'>
                            <div className='configuracion'>
                                <br />
                                    
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                        <TextField fullWidth label="Titulo" id="Titulo" className='itemcolor' name='titulo' value={formData.titulo} onChange={handleChange} />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Descripcion" id="Descripcion" className='itemcolor' name='descripcion' value={formData.descripcion} onChange={handleChange} />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Area" id="Area" className='itemcolor' name='area' value={formData.area} onChange={handleChange}/>
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                                            <TextField fullWidth label="Duracion" id="Duracion" className='itemcolor'  name='duracion' value={formData.duracion} onChange={handleChange} />
                                        </Box>
                                            </div>
                                        
                                        <div className='arreglo'>
                                        
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha Publica"
                                                className='itemcolor' 
                                                value={formData.fechaPublica ? dayjs(formData.fechaPublica) : null}
                                                onChange={(newValue) =>
                                                setFormData({
                                                    ...formData,
                                                    fechaPublica: newValue ? newValue.format("YYYY-MM-DD") : ""
                                                })
                                                }
                                                sx={{ width: 500, maxWidth: '45%' }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha Cierre"
                                                className='itemcolor' 
                                                value={formData.fechaCierre ? dayjs(formData.fechaCierre) : null}
                                                onChange={(newValue) =>
                                                setFormData({
                                                    ...formData,
                                                    fechaCierre: newValue ? newValue.format("YYYY-MM-DD") : ""
                                                })
                                                }
                                                sx={{ width: 500, maxWidth: '45%' }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                        <FormControlLabel className='color'
                                            control={
                                            <Checkbox
                                                checked={formData.certificado === 1}
                                                onChange={(e) =>
                                                setFormData({ ...formData, certificado: e.target.checked ? 1 : 0 })
                                                }
                                            />
                                            }
                                            label="Certificado"
                                        />
                                            </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                            <FormControlLabel className='color'
                                                control={
                                                <Checkbox
                                                    checked={formData.cursoLibre === 1}
                                                    onChange={(e) =>
                                                    setFormData({ ...formData, cursoLibre: e.target.checked ? 1 : 0 })
                                                    }
                                                />
                                                }
                                                label="Curso Libre"
                                            />
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                        <FormControlLabel className='color'
                                                control={
                                                <Checkbox
                                                    checked={formData.evaluacion === 1}
                                                    onChange={(e)=>
                                                    setFormData({ ...formData, evaluacion: e.target.checked ? 1 : 0 })
                                                    }
                                                />
                                                }
                                                label="Evaluación"
                                            />    
                                        </Box>
                                        <Box sx={{ width: 500, maxWidth: '30%' }}>
                                        <FormControlLabel className='color'
                                                control={
                                                <Checkbox
                                                    checked={formData.obligatorio === 1}
                                                    onChange={(e) =>
                                                    setFormData({ ...formData, obligatorio: e.target.checked ? 1 : 0 })
                                                    }
                                                />
                                                }
                                                label="Obligatorio"
                                            />      
                                        </Box>
                                        
                                  
                                        
                        </div>
                        
                        
                        </div>
                        
                        <div className='box-videos'>
                            
                            <div className='video'>
                                <p className='fuente'>VIDEO</p>
                        <div className='video-cont'>
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
                                
                                 <video 
                                    key={videoSrc}
                                    controls 
                                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                    >
                                    <source src={videoSrc} type="video/mp4" />
                                         Tu navegador no soporta videos.
                                    </video> 
                                </div>
                            )}
                            </div>
                            </div>
                            <div className='box-boton'>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="success" onClick={abrirDialogoArchivo}>Agregar</Button>
                                <Button variant="contained" onClick={GuardarDatos}>Guardar</Button>
                                <Button variant="contained" color="error" onClick={eliminarCurso}>Eliminar</Button>
                            </Stack>
                            </div>
                        </div>
                    </div>
                    <div className="conteiner-agregar">
                        <p className='text-pregunta' style={{color:'white',fontSize:'20px'}}>Mis Publicaciones activas</p>

                        <div className='div-publicacion'>
                          {misCursos.map((curso) => {
                            
                                return (    
                                <li className='publicaciones-activa' key={curso.id}  onClick={()=>selectorCurso(curso)} style={{ cursor: "pointer" }}>
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
                            <div className='btn-espacio'>
                                <Button variant="contained" size="medium" onClick={() => guardarEvaluacion(data.id)} >
                                         Agregar
                            </Button>
                            </div>
                            
                            <div className='pregunta'>
                                <p className='text-pregunta'>Pregunta N° 1</p>
                                <div className='alternativas'>
                                    <TextField id="filled-basic"  label="Titulo" variant="filled" name='titulo' className='itemtitulo' value={quiz.titulo} onChange={funcionchance}/>
                                    <br />
                                    <div className='agregar'>
                                        
                                        <div>
                                           <Fab size="medium" className='alternativa' name='alternativa' color="primary" aria-label="add" onClick={añadirAlternativa} disabled={alternativas.length >= 4}>
                                            <AddIcon />
                                            </Fab> 
                                        </div>
                                        <div className='separador'>
                                            <div className='deslizar'>
                                                    
                                                        {alternativas.map((alt, index) => (
                                                            <div key={index} className='itemalternativa'>
                                                    <TextField
                                                            label={`Alternativa ${index + 1}`}
                                                            value={alt.texto}
                                                            onChange={(event) => actualizaralternativa(index, event)}
                                                            variant="filled"
                                                            className='itemalt'
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                            <Checkbox
                                                                name='respuesta'
                                                                checked={alt.seleccionada}
                                                                onChange={() => filaCheckbox(index)}
                                                            />
                                                            }
                                                            label=""
                                                        />
                                                    </div>
                                                    
                                                ))}
                                            </div>
                                        </div>
                                    
                                    </div>
                                    
                                     </div>
                            </div>
                            <div>{evaluaciones.map((p) =>(
                                <li>
                                    <ul>{p.titulo}</ul>
                                    </li>
                            ))}
                                </div>
                            
                        </div>
                        <div className='participantes'>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap');
                        </style>
                               <p className='text-pregunta'>Participantes</p>
                               <div className='btn-espacio'>
                                <Button variant="contained" size="small"  onClick={abrirDialogoParticipantes} >
                                agregar
                                </Button>
                               </div>
                              
                               <div className='base-lista'>
                                 {participantesSeleccionados.map((p,item) => (
                                    
                                    <div key={p.id} className='par-agregado'><p className='nombre-usuario'>{p.usuario}</p><DeleteForeverIcon onClick={() => eliminarItem(p.id)} /></div>
                                ))}
                               </div>
                               
                                 
                           
                        </div>
                    </div>
                    
                </div>
                <AgregarParticipantes open={abrirDialogo} onClose={cerrarDialogo} onSeleccionarParticipantes={setParticipantesSeleccionados} />
            
        </div>
    )}
export default Publicacion 