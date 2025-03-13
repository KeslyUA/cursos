import * as React from 'react';
import Navegacion from '../navegacion/Navegacion';
import { Route, Routes,Navigate } from 'react-router';
import Comunidad from '../comunidad/Comunidad';
import Novedades from '../novedades/Novedades';
import Explorar from '../explorar/Explorar';
import Cursos from '../cursos/Cursos';
import Publicacion from '../publicacion/Publicacion';
/* import RutaProtegida from './RutaProgida'; */
const RutaProtegida = ({ children, rolesPermitidos }) => {
  const token = localStorage.getItem("token");
  const cargo = localStorage.getItem("cargo");

  if (!token || !rolesPermitidos.includes(cargo)) {
    return <Navigate to="/Explorar" />;
  }

  return children;
};

const saludo =()=>{
  return(
    
  <div>
   
    <Navegacion></Navegacion>
    {/* //Definiendo las rutas */}
    <Routes>
      <Route path="/Explorar" element={<Explorar />}></Route>
      <Route path="/Comunidad" element={<Comunidad />}></Route>
      <Route path="/Novedades" element={<Novedades />}></Route>
      {/* <Route path='/Cursos' element={<Cursos />}></Route>
      <Route path='/Publicacion' element={<Publicacion />}></Route> */}
     {/*  rutas de administrador */}
       <Route
          path="/Cursos"
          element={
            <RutaProtegida rolesPermitidos={["administrador"]}>
              <Cursos />
            </RutaProtegida>
          }
        />
      <Route path="/Publicacion" element={<RutaProtegida rolesPermitidos={["administrador"]}>
              <Publicacion />
            </RutaProtegida>}> 
      </Route> 
      
    </Routes>
   
  </div>
  
)  
}
export default saludo