import * as React from 'react';
import Navegacion from '../navegacion/Navegacion';
import { Route, Routes } from 'react-router';
import Comunidad from '../comunidad/Comunidad';
import Novedades from '../novedades/Novedades';
import Explorar from '../explorar/Explorar';
import Cursos from '../cursos/Cursos';
import Publicacion from '../publicacion/Publicacion';


const saludo =()=>{
  return(
    
  <div>
   
    <Navegacion></Navegacion>
    {/* //Definiendo las rutas */}
    <Routes>
      <Route path="/Explorar" element={<Explorar />}></Route>
      <Route path="/Comunidad" element={<Comunidad />}></Route>
      <Route path="/Novedades" element={<Novedades />}></Route>
      <Route path="/Cursos" element={<Cursos />}></Route>
      <Route path="/Publicacion" element={<Publicacion/>}> </Route>
    </Routes>
   
  </div>
  
)  
}
export default saludo