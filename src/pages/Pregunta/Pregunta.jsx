import * as React from 'react';
import '../Pregunta/pregunta.css'
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MaxWidthDialog from '../dialogo/puntaje/Puntaje'

const Pregunta =()=>{
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {idCurso,idUsuario} = useParams();
    const idCursos = Number(idCurso);console.log("id",idCursos)
    const iduser =Number(idUsuario);console.log("uu",iduser)
    const [evaluacionClick, setEvaluacionClick] = useState(null);
    const [alternativa, setAlternativas] = useState({});
    const [seleccionado, setSeleccionado] = useState({});
    const [resultado,setResultado] = useState(0);
    const [puntaje,setPuntaje] = useState(0);
    const [open, setOpen] = React.useState(false);

    const manejarSeleccion = (idPregunta,alt) => {console.log("idsss",idPregunta,"oño",alt)
      setSeleccionado((prev) => ({
        ...prev,
        [idPregunta]: alt.id
      })); 
      setResultado((prevResultado) => prevResultado + (alt.seleccionada ? 1 : 0)); console.log("resultado",resultado)
    };
      
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    useEffect(() => {
      const cargarPreguntas = async () => {
        try {
          const token = localStorage.getItem("token");
  
          const resPreguntas = await fetch("http://localhost:3001/preguntas", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          const todasPreguntas = await resPreguntas.json(); console.log("totot",todasPreguntas)
          const preguntasFiltradas = todasPreguntas.filter(p => Number(p.idCurso) ===  idCursos);console.log("filtro",preguntasFiltradas)
          setEvaluacionClick(preguntasFiltradas);console.log("idff",preguntasFiltradas)
  
          // Cargar alternativas para cada pregunta
          
          const idEvaluacion=preguntasFiltradas.map((p)=>p.id);console.log("peppe",idEvaluacion)
         

            const resAlt = await fetch(`http://localhost:3001/alternativas`, {
              method:"GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
              
            const dataAlt = await resAlt.json();console.log("yy",dataAlt)
            const alternativasFiltradas = dataAlt.filter((alt) =>
              idEvaluacion.includes(alt.idPreguntas)
            );

            const alternativasAgrupadas = {};
            alternativasFiltradas.forEach((alt) => {
              if (!alternativasAgrupadas[alt.idPreguntas]) {
                alternativasAgrupadas[alt.idPreguntas] = [];
              }
              alternativasAgrupadas[alt.idPreguntas].push(alt);
            });
            
            setAlternativas(alternativasAgrupadas);  console.log("esto se ve",alternativasAgrupadas)
            
        } catch (error) {
          console.error("Error cargando preguntas:", error);
        }
      };
  
      cargarPreguntas();
    }, [idCursos]);

    
 

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
                          idCurso:idCursos,
                
                          puntaje:resultado
                      })

                    });console.log("puntaje",resultado)
                    const data =await respuesta.json();
                    
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
    const idCurso = idCursos;
    
    
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
          if(respuesta.ok){
            handleClickOpen()
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
                                        {evaluacionClick && evaluacionClick.map((p) => (
                                          <div key={p.id} className='preguntas'>
                                            <br />
                                            <h3>{p.titulo}</h3>

                                            <div className='sub-alt'>
                                            {alternativa[p.id]?.map((alt) => (
                                              <p key={alt.id}>
                                                <Checkbox
                                                  {...label}
                                                  checked={seleccionado[p.id]=== alt.id}

                                                  onChange={() => manejarSeleccion(p.id, alt)}
                                                />
                                                {alt.texto}
                                              </p>
                                            ))}

                                            </div>{resultado}
                                            <br />
                                          </div>
                                        ))}
                                      </div>

                                   <div className='btn-guardar-respuesta'>
                                    <br />
                                        <Button variant="contained" disableElevation onClick={GuardarOActualizarPuntaje}>
                                        Guardar Respuesta
                                        </Button> 
                                        
                                    </div>  
                                     
                         </div>
                     <MaxWidthDialog open={open} onClose={() => setOpen(false)} puntaje={resultado}/>
                                
        </div>
    )

}

export default Pregunta