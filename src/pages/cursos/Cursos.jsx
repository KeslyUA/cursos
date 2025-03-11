import './cursos.css'
import { useEffect, useState } from "react";
import FormularioVideo from '../publicacion/guardar/Guardar.jsx';
import Button from '@mui/material/Button';

const Cursos = () => {
    const [videoData, setVideoData] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3001/cursos")
          .then((response) => response.json())
          .then((data) => {
              console.log("Datos recibidos:", data); // Ver qué devuelve la API
              setCursos(Array.isArray(data) ? data : []); // Asegurar que sea un array
          })
          .catch((error) => console.error("Error al obtener cursos:", error));
    }, []);
    
    const agregarCurso = (curso) => {
        console.log("Intentando agregar curso:", curso); // Verificar el curso que se intenta agregar
    
        if (!cursosSeleccionados.some(c => c.id === curso.id)) {  
            setCursosSeleccionados(prevCursos => {
                const nuevosCursos = [...prevCursos, curso];
                console.log("Cursos seleccionados después de agregar:", nuevosCursos); // Verificar estado actualizado
                return nuevosCursos;
            });
        } else {
            console.warn("El curso ya está en la lista:", curso);
        }
    };
    
  
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
                     {cursosSeleccionados.map((curso) => (console.log("hola",curso.id),
                         <div key={curso.id} className='clase-agregada' >
                            <br />
                             <div className='arreglo-titulo'>
                                 <div className='font'>{curso.titulo}</div>
                                 <div className='font'>{curso.descripcion}</div>
                                 <p><strong>Área:</strong> {curso.area}</p>
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
                             <div className='imagen-clase'></div>
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
            <p className='titulo-c'>Cursos Disponibles</p>
            <div>
                <div className='disponibles' >
                    {cursos.map((curso) =>(console.log("hola",curso.id),
                       <div key={curso.id} className='clase'>
                       <div className='clase-linea'>
                        <div className='font'>{curso.titulo}</div>
                       <Button variant="outlined" size="medium" onClick={() => agregarCurso(curso)}>
                        Agregar
                        </Button>
                        </div> 
                        <div className='imagen-curso'></div>
                       
                       {/* <p>{curso.descripcion}</p>
                       <p><strong>Área:</strong> {curso.area}</p>
                       <p><strong>Duración:</strong> {curso.duracion}</p>
                       <p>
                           <strong>Fecha de Publicación:</strong> 
                           {curso.fechaPublica ? new Date(curso.fechaPublica).toLocaleDateString() : "No disponible"}
                       </p>
                       <p>
                           <strong>Fecha de Cierre:</strong> 
                           {curso.fechaCierre ? new Date(curso.fechaCierre).toLocaleDateString() : "No disponible"}
                       </p> */}
                        </div>

                    )
                    )}

                </div>
                
                </div>
              
            </div>
        

    )}

    export default Cursos