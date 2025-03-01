import * as React from 'react';
import Navegacion from '../navegacion/Navegacion';
import { Route, Routes } from 'react-router';
import Prueba from '../prueba/Prueba';
import Cursos from '../cursos/Cursos'

const saludo =()=>{
  return(
  <div>
    <Navegacion></Navegacion>
    {/* //Definiendo las rutas */}
    <Routes>
      <Route path="/prueba" element={<Prueba />}></Route>
      <Route path="/cursos" element={<Cursos />}></Route>
    </Routes>
    <h1>hola</h1>
  </div>
  
)  
}
export default saludo