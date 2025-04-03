import * as React from 'react';
import '../Pregunta/pregunta.css'
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const Pregunta =()=>{
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {id} = useParams();
    console.log("ID recibido:", id);
    const [evaluacionClick, setEvaluacionClick] = useState(null);
    const [alternativa, setAlternativas] = useState([]);
    const [seleccionado, setSeleccionado] = useState(null);
    const [resultado,setResultado] = useState(0)

    const manejarSeleccion = (alt) => {
        if (seleccionado === alt.id) return; 
        setSeleccionado(alt.id);  
        setResultado(prev => prev + (alt.seleccionada ? 1 : 0));
    };
      
  
    useEffect(() => {
        const mostrarEvaluacion = async () => {
          try {
            const token = localStorage.getItem("token");
            const respuesta = await fetch("http://localhost:3001/preguntas", {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
    
            const data = await respuesta.json();
            const evaluacionSeleccionada = data.find(e => e.id === parseInt(id));  // Busca por el id de la URL
    
            if (evaluacionSeleccionada) {
              setEvaluacionClick(evaluacionSeleccionada);
    
              const respuestaAlternativas = await fetch(`http://localhost:3001/alternativas?idPreguntas=${id}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
    
              const dataAlternativas = await respuestaAlternativas.json();
              setAlternativas(Array.isArray(dataAlternativas) ? dataAlternativas : []);
            }
          } catch (error) {
            console.error("Error al obtener evaluación:", error);
          }
        };
    
        if (id) {
          mostrarEvaluacion();
        }
      }, [id]);

    

    
    return(
        <div>
            <div className='fondo-pre'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
               
                    <div className='cont'>
                                    {evaluacionClick && (
                                            <div className='preguntas' >
                                                <br />
                                                <h3>{evaluacionClick.titulo}</h3>
                                                <div className='sub-alt'>
                                                    {alternativa.map((alt) => (
                                                        <p key={alt.id} className={alt} ><Checkbox {...label} checked={seleccionado === alt.id} onChange={() => manejarSeleccion(alt)} /> {alt.texto}</p>
                                                    ))}
                                                </div>
                                                <br />
                                            </div>
                                        )}
                                        
                                        </div>
                                   <div className='btn-guardar-respuesta'>
                                    <br />
                                        <Button variant="contained" disableElevation>
                                        Guardar Respuesta
                                        </Button>  
                                    </div>  
                                    <h4>Resultado: {resultado }</h4>   
                         </div>
                    
        </div>
    )

}

export default Pregunta