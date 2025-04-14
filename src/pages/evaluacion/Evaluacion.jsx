import '../evaluacion/evaluacion.css'
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const Evaluacion = () =>{

    const [evaluacion,setEvaluacion] =useState([]);


    const navegar = useNavigate()
   
    useEffect(() =>{
        const token = localStorage.getItem("token");
        

        fetch("http://localhost:3001/preguntas", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          })
          .then((response) => response.json())
          .then((data) => {
            
            console.log("Respuesta del servidor:", data);
            setEvaluacion(Array.isArray(data) ? data : []); 
        })
             

       
    
    },[]);
    const cursosUnicos = Array.from(
        new Map(evaluacion.map((p) => [p.idCurso, p])).values()
      );


    const preguntas = (idCurso) => {
        const pregunta = evaluacion.find((p) => p.idCurso === idCurso);
        const idUsuario = pregunta?.idUsuario;
        navegar(`/Pregunta/${idCurso}/${idUsuario}`)
    }
    
    return(
        
        <div className='fondo-evaluacion'>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        </style>
            
            <div className='cont-supeva'>
                <div className='contenido-e'>
                    {cursosUnicos.map((p) => (
                        
                            <div key={p.idCurso} className='cont-evaluacion' onClick={() =>preguntas (p.idCurso)}>
                                <div >{p.curso.titulo}</div>
                            </div>
                            
                        
                    ))}
                </div>
                
            </div>
            
        </div>
    )
        
}
export default Evaluacion