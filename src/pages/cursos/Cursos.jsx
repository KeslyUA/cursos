
import { useEffect, useState } from "react";
import FormularioVideo from '../publicacion/guardar/Guardar.jsx';
import '../cursos/cursos.css'

const Cursos = () => {
    const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("videoData");
    if (storedData) {
      setVideoData(JSON.parse(storedData));
    }
  }, []);

  if (!videoData) {
    return <p>No hay video guardado.</p>;
  }

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
                
                <div className='clase'>
                <p>Seguridad industrial</p>
                <div className='imagen'>
                <div>
                    <h2>{videoData.titulo}</h2>
                    <p>{videoData.descripcion}</p>
                    <video controls width="300">
                        <source src={videoData.video} type="video/mp4" />
                    </video>
                </div>
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