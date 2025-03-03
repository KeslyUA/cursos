import * as React from 'react';
import Navegacion from '../navegacion/Navegacion';
import { Route, Routes } from 'react-router';
import Comunidad from '../comunidad/Comunidad';
import Novedades from '../novedades/Novedades';
import Explorar from '../explorar/Explorar';


const saludo =()=>{
  return(
    
  <div>
   
    <Navegacion></Navegacion>
    {/* //Definiendo las rutas */}
    <Routes>
      <Route path="/Explorar" element={<Explorar />}></Route>
      <Route path="/Comunidad" element={<Comunidad />}></Route>
      <Route path="/Novedades" element={<Novedades />}></Route>
    </Routes>
   
  </div>
  
)  
}
export default saludo