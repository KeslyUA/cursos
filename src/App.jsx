import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Principal from './pages/principal/Principal'

const BASE_URL = 'http://localhost:5000'

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    axios.get(`${BASE_URL}/usuarios`)
      .then(response => {
        console.log("Datos recibidos:", response.data);
        setUsuarios(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        setLoading(false); 
      });
  }, []); 

  return (
    <div>
      <h1>Usuarios</h1>
      {loading ? (
        <p>Cargando...</p> 
      ) : (
        <Principal usuarios={usuarios} /> 
      )}
    </div>
  );
}

export default App;
