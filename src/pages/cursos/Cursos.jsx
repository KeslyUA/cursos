import React from 'react';
import './cursos.css'
import { useEffect, useState,useRef } from "react";
import Button from '@mui/material/Button';

const Cursos = ({ curso }) => {
    const [cursos, setCursos] = useState([]);
    const [videoSeleccionado,setVideoSeleccionado] = useState([]);
    const [misCursos,setMisCursos] =useState([]);
    const videoRefs = useRef({});
    const [tiempoGuardado, setTiempoGuardado] = useState(0);
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [videoActivo, setVideoActivo] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No hay token almacenado en localStorage.");
            return;
          }
        fetch("http://localhost:3001/cursos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          })
          .then((response) => response.json())
          .then((data) => {
              setCursos(Array.isArray(data) ? data : []); 
          })
          .catch((error) => console.error("Error al obtener cursos:", error));
    }, []);

    //para actualizar
    const fetchCursos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/agregados", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) throw new Error("Error al obtener los cursos");
    
            const data = await response.json();
            setVideoSeleccionado(data);
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        }
    };
    
    useEffect(() => {
        fetchCursos(); 
    }, []);
    

    //para agregar curso seleccionado
    const agregarCurso =async (idCurso) => { 
        
        try {
            const token = localStorage.getItem("token"); 

            if (!token) {
                console.error("No hay token almacenado.");
                return;
            }
            const response = await fetch("http://localhost:3001/agregados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ idCurso })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Error al agregar el curso");
            }
    
            await fetchCursos();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    
    

    //para eliminar curso seleccionado
    const eliminarCurso = async (idCurso) => {
        try {
            const token = localStorage.getItem("token");
    
            if (!token) {
                console.error("No hay token almacenado.");
                return;
            }
    
            const response = await fetch(`http://localhost:3001/agregados/${idCurso}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Error al eliminar el curso");
            }
    
            await fetchCursos(); 
        } catch (error) {
            console.error("Error:", error.message);
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
    
    useEffect(() => {
        obtenerPublicacionPorUsuario();
    },[]);
    
    useEffect(() => {
            //guardar tiempo de video
            if (!curso || !curso.id) return;
            const tiempoAlmacenado = localStorage.getItem(`videoTiempo-${curso.id}`);
            if (tiempoAlmacenado) {
                setTiempoGuardado(parseFloat(tiempoAlmacenado));
            }
            if (videoRefs.current) {
                videoRefs.current.currentTime = parseFloat(tiempoAlmacenado) || 0; 
            }

          }, [curso]);

    

    const manejarReproduccion = (idCurso) => {
        setVideoActivo(idCurso)
        setMostrarVideo(true);
        setTimeout(() => {
            if (videoRefs.current[idCurso]) {
                videoRefs.current[idCurso].currentTime = tiempoGuardado[idCurso] || 0;
                videoRefs.current[idCurso].play();
            }
        }, 100);
        };

        const cerrarVideo = () => {
            setMostrarVideo(false);
            setVideoActivo(null);
        };    
    
        const manejarPausa = (idCurso) => {
            if (videoRefs.current[idCurso]) {
                setTiempoGuardado((prev) => ({
                    ...prev,
                    [idCurso]: videoRefs.current[idCurso].currentTime,
                }));
            }
        };     


    const mouseEnter = (event) =>{
        const video =event.currentTarget;
        if (video.readyState >= 2 && video.paused){
         video.currentTime = 0;
        video.play();  

         video.stopTimeout=setTimeout(() =>{
            video.pause();
            video.currentTime = 0;
        },5000);//5 segundos
        }
    } 
    const mouseLeave = (event) => {
        const video = event.currentTarget;
        video.pause();
        
        if (video.stopTimeout) {
            clearTimeout(video.stopTimeout);
        }
    }    
  
    return (
        <div className='fondo-cursos'>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
           
            <div className='principal'>
                <div className='contenedor'>
                {videoSeleccionado.length> 0 &&(
                     <div className='fondo'>
                     {videoSeleccionado.map((curso) => (
                         <div key={curso.id} className='clase-agregada' >
                            
                            
                             <div className='arreglo-titulo'>
                                 <div className='titulo'>{curso.curso.titulo}</div>
                                 <div className='ima-video'>
                            {curso.curso.videoURL ? (
                                <video  
                                width="100%"
                                height="100%" 
                                muted 
                                playsInline 
                                loop 
                                controls
                                >
                                    <source src={curso.curso.videoURL}  type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                            ) : (
                                <p>Video no disponible</p>
                            )}
                        </div>
                                 <div className='descripcion'>
                                   <p><strong>Duración:</strong> {curso.duracion}</p>
                                     <p>
                                    <strong>Fecha de Publicación:</strong> 
                                    {curso.fechaPublica ? new Date(curso.fechaPublica).toLocaleDateString() : "No disponible"}
                                     </p>
                                    <p>
                                    <strong>Fecha de Cierre:</strong> 
                                    {curso.fechaCierre ? new Date(curso.fechaCierre).toLocaleDateString() : "No disponible"}
                                    </p> 
                                 </div>
                                 <Button variant="contained" size="small" onClick={() => manejarReproduccion(curso.id)}>
                                    reanudar
                                </Button>
                                <Button variant="contained" size="small" color='error' onClick={() => eliminarCurso(curso.idCurso)}>
                                    eliminar
                                </Button>
                                <br />
                             </div>
                                {mostrarVideo && videoActivo === curso.id && (
                                    <div className="video-flotante" onClick={cerrarVideo}>
                                        <div className="video-contenedor">
                                        {curso.curso.videoURL ? (
                                            <video ref={(el) => (videoRefs.current[curso.id] = el)} 
                                            width="100%"
                                            height="100%" 
                                            playsInline 
                                            loop 
                                            controls 
                                            autoPlay
                                            onPause={() => manejarPausa(curso.id)} 
                                            >
                                            <source src={curso.curso.videoURL} type="video/mp4" />
                                                Tu navegador no soporta el video.
                                            </video>
                                            ) : (
                                            <p>Video no disponible</p>
                                            )}
                                            <button className="cerrar-video" onClick={cerrarVideo}>X</button>
                                        </div>
                                    </div>
                                )}
                        </div>
                         
                     ))}
                 </div>
                )}
                </div>
                    
                <div className='certificaciones'>
                    <p className='titulo-cer'>Mis certificaciones</p>
                    <div className='item-certi'>
                        Seguridad Industrial
                    </div>
                    <div className='item-certi'>
                        Seguridad Industrial
                    </div>
                    <div className='item-certi'>
                        Seguridad Industrial
                    </div>
                    <div className='item-certi'>
                        Seguridad Industrial
                    </div>
                    <div className='item-certi'>
                        Seguridad Industrial
                    </div>
                    <br />
                </div>
            
            </div>
            
            <p className='titulo-c'>Cursos Disponibles</p>
            <div className='tercero'>
                <div className='disponibles' >
                    {cursos.map((curso) =>( 

                       <div key={curso.id} className='clase'>
                       <div className='clase-linea'>
                        <div className='font'>{curso.titulo}</div>
                       <Button variant="outlined" size="medium" onClick={() => agregarCurso(curso.id)}>
                        Agregar
                        </Button>
                        </div> 
                        <div className='imagen-curso'>
                            {curso.videoURL ?(
                                <video 
                                width="100%" 
                                height="100%"
                                muted 
                                playsInline 
                                preload="metadata"
                                onMouseEnter={mouseEnter} 
                                onMouseLeave={mouseLeave}>
                                <source src={curso.videoURL} type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                        ):(
                            <p>Video no disponible</p>
                        )}
                        </div>
                        <br />
                               
                                    
                        </div>

                    )
                    )}

                </div>
                
                </div>
              
            </div>
        

    )}

    export default Cursos