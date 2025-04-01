import '../evaluacion/evaluacion.css'
import React, { useEffect, useState } from 'react';
const Evaluacion = () =>{

    const [evaluacion,setEvaluacion] =useState([]);
    const [alternativa,setAlternativas] = useState([]);
    const [evaluacionClick,setEvaluacionClick] =useState(null);
    const [respuestaSeleccionada,setRespuestaSeleccionada] = useState(null)

    useEffect(() =>{
        const token = localStorage.getItem("token");
        fetch("http://localhost:3001/evaluaciones", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          })
          .then((response) => response.json())
          .then((data) => {
            setEvaluacion(Array.isArray(data) ? data : []); 
        })
             

       
    
    },[]);
    

    const mostrarEvaluacion = async (id) =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await fetch(" http://localhost:3001/evaluaciones",{
                method: "GET",
              headers: {
               "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
            
            const data= await respuesta.json();
            const evaluacionSeleccionada = data.find(e => e.id === id);

            if(evaluacionSeleccionada){
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
            
            

        }catch (error) {
            console.error("Error al obtener evaluación:", error);
        }
    }

    const respuesta = async (alt) =>{
        setRespuestaSeleccionada(alt.id);
        
    }
     

    return(
        
        <div className='fondo-evaluacion'>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wdth,wght@0,85.7,300;1,85.7,300&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        </style>
            
            <div className='cont-supeva'>
                <div className='contenido-e'>
                    {evaluacion.map((p) => (
                        
                            <div key={p.id} className='cont-evaluacion' onClick={() => mostrarEvaluacion(p.id)}>
                                <div >{p.titulo}</div>
                            </div>
                            
                        
                    ))}
                </div>
                <div className='cont-segundario'>
                {evaluacionClick && (
                        <div className='preguntas'>
                            <h3>{evaluacionClick.titulo}</h3>
                            <div className='sub-alt'>
                                {alternativa.map((alt) => (
                                    <div key={alt.id} className={`alt ${respuestaSeleccionada === alt.id ? "seleccionada" : ""}`} onClick={() => respuesta(alt)}>{alt.texto}</div>
                                ))}
                            </div>
                            
                        </div>
                    )}
                </div>
            
            </div>
            
        </div>
    )
        
}
export default Evaluacion