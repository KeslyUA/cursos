import * as React from 'react';
import '../Pregunta/pregunta.css'
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const Pregunta =()=>{
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {id,idUsuario} = useParams();
    const idCurso = Number(id);
    const iduser =Number(idUsuario);console.log("uu",iduser)
    const [evaluacionClick, setEvaluacionClick] = useState(null);
    const [alternativa, setAlternativas] = useState([]);
    const [seleccionado, setSeleccionado] = useState(null);
    const [resultado,setResultado] = useState(0);
    const [puntaje,setPuntaje] = useState(0)

    const manejarSeleccion = (alt) => {
      setSeleccionado(alt.id); 
      setResultado(alt.seleccionada ? 1 : 0); 
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
            const evaluacionSeleccionada = data.find(e => e.id === parseInt(id));  
    
            if (evaluacionSeleccionada) {
              setEvaluacionClick(evaluacionSeleccionada);
    
              const respuestaAlternativas = await fetch(`http://localhost:3001/alternativas?idPreguntas=${id}/${iduser}`, {
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

      //puntajes

      const GuardarPuntaje = async () =>{

        try{
            const respuesta= await fetch("http://localhost:3001/puntaje",{
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("token")}` 
                      },
                      body: JSON.stringify({
                          idCurso:idCurso,
                
                          puntaje:resultado
                      })

                    });console.log("puntaje",resultado)
                    const data =await respuesta.json();
                    
                    if(respuesta.ok){
                      alert("evaluacion guardada")
                    }
                    else{
                      alert("no se guardo evaluacion")
                    }
                    console.log("data puntaje",data)
                  
        }catch (error) {
          console.error("Error al guardar evaluacion", error);
        }

      }  

      const ActualizarPuntaje = async (id, resultado) => {
        try {
            const respuesta = await fetch(`http://localhost:3001/puntaje/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    puntaje: resultado
                })
            });
    
            const data = await respuesta.json();
            if (respuesta.ok) {
                alert("Puntaje actualizado correctamente");
            } else {
                alert("No se pudo actualizar el puntaje");
            }
            console.log("Puntaje actualizado:", data);
            
        } catch (error) {
            console.error("Error al actualizar puntaje:", error);
            alert("Error al actualizar puntaje");
        }
    };
    
    const GuardarOActualizarPuntaje = async () => {
      try {
        const token = localStorage.getItem("token");
    const idUsuario = iduser;
    const idCurso = id
    
    
        const respuesta = await fetch(`http://localhost:3001/puntaje/${idUsuario}/${idCurso}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        });
        const data = await respuesta.json();
          console.log("data del server",data)
          if (data && data.id) {
            console.log("Ya existe puntaje, actualizando...");
            await ActualizarPuntaje(data.id, resultado);
          } else {
            console.log("No existe puntaje, creando nuevo...");
            await GuardarPuntaje();
          }
          
      } catch (error) {
        console.error("Error al guardar o actualizar puntaje:", error);
      }
    };
    
    
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
                                        <Button variant="contained" disableElevation onClick={GuardarOActualizarPuntaje}>
                                        Guardar Respuesta
                                        </Button>  
                                    </div>  
                                    <h4>Resultado: {resultado }</h4>   
                         </div>
                    
        </div>
    )

}

export default Pregunta