
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Principal from'./pages/principal/Principal'

const BASE_URL = 'http://localhost:3001'

function App() {
  const [count, setCount] = useState(0)
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/usuarios`)
      .then(response => {console.log("Datos recibidos:", response.data);setUsuarios(response.data)})
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);
  return (
    <Principal />
  )
}

export default App
