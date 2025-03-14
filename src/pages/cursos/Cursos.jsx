import './cursos.css'
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import misCursos from '../publicacion/Publicacion';

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
    const [misCursos,setMisCursos] =useState([])


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
    
    const agregarCurso = (curso) => {
        console.log("Intentando agregar curso:", curso); 
    
        if (!cursosSeleccionados.some(c => c.id === curso.id)) {  
            setCursosSeleccionados(prevCursos => {
                const nuevosCursos = [...prevCursos, curso];
                console.log("Cursos seleccionados después de agregar:", nuevosCursos); 
                return nuevosCursos;
            });
        } else {
            console.warn("El curso ya está en la lista:", curso);
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
          }, []);
  
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
                                 <div className='ima-video'></div>
                                 <div className='descripcion'>
                                    {/* <p><strong>Descripcion:</strong> {curso.descripcion}</p>
                                    <p><strong>Área:</strong> {curso.area}</p>
                                     */}<p><strong>Duración:</strong> {curso.duracion}</p>
                                     <p>
                                    <strong>Fecha de Publicación:</strong> 
                                    {curso.fechaPublica ? new Date(curso.fechaPublica).toLocaleDateString() : "No disponible"}
                                     </p>
                                    <p>
                                    <strong>Fecha de Cierre:</strong> 
                                    {curso.fechaCierre ? new Date(curso.fechaCierre).toLocaleDateString() : "No disponible"}
                                    </p> 
                                 </div>
                                 <Button variant="contained" size="small">
                                    reanudar
                                </Button>
                                    
                             </div>
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
            <div>
                <div className='disponibles' >
                    {cursos.map((curso) =>(
                       <div key={curso.id} className='clase'>
                       <div className='clase-linea'>
                        <div className='font'>{curso.titulo}</div>
                       <Button variant="outlined" size="medium" onClick={() => agregarCurso(curso)}>
                        Agregar
                        </Button>
                        </div> 
                        <div className='imagen-curso'></div>
                            <p>{curso.videoURL}</p>
                        </div>

                    )
                    )}

                </div>
                
                </div>
              
            </div>
        

    )}

    export default Cursos