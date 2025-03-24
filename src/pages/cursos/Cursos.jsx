import React from 'react';
import './cursos.css'
import { useEffect, useState,useRef } from "react";
import Button from '@mui/material/Button';
import misCursos from '../publicacion/Publicacion';

const Cursos = ({ curso }) => {
    const [cursos, setCursos] = useState([]);
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
    const [misCursos,setMisCursos] =useState([])
    const videoRef = useRef(null);
    const [tiempoGuardado, setTiempoGuardado] = useState(0);
    const [mostrarVideo, setMostrarVideo] = useState(false);



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
              console.log("Datos recibidos:", data); 
              setCursos(Array.isArray(data) ? data : []); 
          })
          .catch((error) => console.error("Error al obtener cursos:", error));
    }, []);

    //para agregar curso seleccionado
    const agregarCurso = (curso) => { 
    
        if (!cursosSeleccionados.some(c => c.id === curso.id)) {  
            
                const nuevosCursos = [...cursosSeleccionados, curso]; 
                setCursosSeleccionados(nuevosCursos);
                localStorage.setItem("cursosSeleccionados", JSON.stringify(nuevosCursos)); 
        } else {
            console.warn("El curso ya está en la lista:", curso);
        }
    };

    //para eliminar curso seleccionado
    const eliminarCurso = (id) => {
        const nuevosCursos = cursosSeleccionados.filter(curso => curso.id !== id);
        setCursosSeleccionados(nuevosCursos);
        localStorage.setItem("cursosSeleccionados", JSON.stringify(nuevosCursos)); 
    };
    
    //guaradar en localstore para no perder cursos seleccionados :)

    useEffect(() =>{
        const cursosGuardados = localStorage.getItem("cursosSeleccionados");
        if (cursosGuardados) {
            setCursosSeleccionados(JSON.parse(cursosGuardados));
        }
    },[])

     
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
            if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(tiempoAlmacenado) || 0; 
            }

          }, [curso]);

    

    const manejarReproduccion = () => {
        setMostrarVideo(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.currentTime = tiempoGuardado;
                videoRef.current.play();
            }
        }, 100);
        };

        const cerrarVideo = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0; 
            }
            setMostrarVideo(false); 
        };    
    
    const manejarPausa = () => {
        if (videoRef.current && curso && curso.id) {
                const tiempoActual = videoRef.current.currentTime;
                if (tiempoActual > 0){
                   localStorage.setItem(`videoTiempo-${curso.id}`, tiempoActual);  
                }
                
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
            <style>
             @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
            <div className='principal'>
                <div className='contenedor'>
                {cursosSeleccionados.length> 0 &&(
                     <div className='fondo'>
                     {cursosSeleccionados.map((curso) => (
                         <div key={curso.id} className='clase-agregada' >
                            <br />
                            
                             <div className='arreglo-titulo'>
                                 <div className='titulo'>{curso.titulo}</div>
                                 <div className='ima-video'>
                            {curso?.videoURL ? (
                                <video ref={videoRef} width="100%" muted playsInline loop controls>
                                    <source src={curso.videoURL} type="video/mp4" />
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
                                 <Button variant="contained" size="small" onClick={manejarReproduccion}>
                                    reanudar
                                </Button>
                                <Button variant="contained" size="small" color='error' onClick={() => eliminarCurso(curso.id)}>
                                    eliminar
                                </Button>
                                <br />
                             </div>
                                {mostrarVideo && (
                                    <div className="video-flotante" onClick={cerrarVideo}>
                                        <div className="video-contenedor">
                                        {curso?.videoURL ? (
                                            <video ref={videoRef} width="100%" muted playsInline loop controls onPause={manejarPausa} >
                                            <source src={curso.videoURL} type="video/mp4" />
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
            <div className='segundario'>
                <p className='titulo-cer'>Mis Publicaciones</p>
                <div className='panel-publicaciones'>
                {misCursos.map((curso) => {
                            
                            return (    
                            <li className='lista' key={curso.id} >
                                <ul>{curso.titulo}</ul>
                            </li>
                            );
                     })}  
                </div>
            </div>
            <p className='titulo-c'>Cursos Disponibles</p>
            <div className='tercero'>
                <div className='disponibles' >
                    {cursos.map((curso) =>( 

                       <div key={curso.id} className='clase'>
                       <div className='clase-linea'>
                        <div className='font'>{curso.titulo}</div>
                       <Button variant="outlined" size="medium" onClick={() => agregarCurso(curso)}>
                        Agregar
                        </Button>
                        </div> 
                        <div className='imagen-curso'>
                            {curso.videoURL ?(
                                <video 
                                width="100%"  
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