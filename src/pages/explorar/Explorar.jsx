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
            <div className='fondo-explorar'>
                <div className='contenedor-uno'>
                <div className='titulo'>
                    <h1>Escuela de capacitacion empresarial </h1>
                    <h1>cursos de capacitacion para los colaboradores</h1>
                    <br />
                    <h3>Ingrese a la plataforma de capacitacion para recibir mas de 3000 cursos</h3>
                    
                </div>
                </div>
                <div className='contenedor-dos'>
                <h2 className='subtitulo'>cursos disponibles:</h2>
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