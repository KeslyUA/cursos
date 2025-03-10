import './cursos.css'
import { useEffect, useState } from "react";
import FormularioVideo from '../publicacion/guardar/Guardar.jsx';

const Cursos = () => {
    const [videoData, setVideoData] = useState(null);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/cursos") // Llama a la API owo
          .then((response) => response.json())
          .then((data) => setCursos(data))
          .catch((error) => console.error("Error al obtener cursos:", error));
      }, []);
    
  
    return (
        <div className='fondo-cursos'>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
            <div className='principal'>
                <div className='contenedor'>

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
            <div className='disponibles'>
                //videos conteiners
                <div>
                    {cursos.map((curso) =>(
                        <li key={curso.id}>
                        <h3>{curso.titulo}</h3>
                        <p>{curso.descripcion}</p>
                        <p><strong>Área:</strong> {curso.area}</p>
                        <p><strong>Duración:</strong> {curso.duracion}</p>
                        <p><strong>Fecha de Publicación:</strong> {new Date(curso.fechaPublica).toLocaleDateString()}</p>
                        <p><strong>Fecha de Cierre:</strong> {new Date(curso.fechaCierre).toLocaleDateString()}</p>
                      </li>

                    )
                    )}

                </div>
                
                </div>
                <div className='clase'>
                <p>Seguridad industrial</p>
                <div className='imagen'></div>
                </div>
                <div className='clase'>
                <p>Seguridad industrial</p>
                <div className='imagen'></div>
                </div>
                <div className='clase'>
                <p>Seguridad industrial</p>
                <div className='imagen'></div>
                </div>
            </div>
        </div>

    )}

    export default Cursos