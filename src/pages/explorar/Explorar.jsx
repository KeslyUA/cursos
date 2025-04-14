import * as React from 'react';
import '../explorar/explorar.css';
import { useEffect, useState } from "react";

const Explorar = () => {
    
        const [cursos, setCursos] = useState([]);
        const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

        useEffect(() => {
            fetch("http://localhost:3001/cursos")
              .then((response) => response.json())
              .then((data) => {
                  console.log("Datos recibidos:", data); 
                  setCursos(Array.isArray(data) ? data : []); 
              })
              .catch((error) => console.error("Error al obtener cursos:", error));
        }, []);


        
    
    return (
         
            <div>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap');
            </style>
            <div className='fondo-explorar'>
                <div className='contenedor-uno'>
                <div className='titulo-ex'>
                    <p>Escuela de capacitacion empresarial </p>
                    <p>cursos de capacitacion para los colaboradores</p>
                    <br />
                    <p className='titulo-sub'>Ingrese a la plataforma de capacitacion para recibir mas de 3000 cursos</p>
                    
                </div>
                </div>
                <div className='contenedor-dos'>
                <h2 className='subtitulo'>Cursos disponibles:</h2>
                <br />
                <br />
                <div className='combo'>
                {cursos.map((curso) =>(console.log("hola",curso.id),
                       <div key={curso.id} className='box'>
                            <div className='box-sub'>
                                <div className='titulo-box'>{curso.titulo}</div>
                            </div> 
                            <div className='img-curso'>{curso.video}</div>
                        </div>

                    )
                    )}
                    
                </div>
                
                </div>
            </div>
            </div>
                    
        
    )
}

export default Explorar