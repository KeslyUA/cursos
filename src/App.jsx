import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Principal from'./pages/principal/Principal'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';



function App() {
 
  const navegacion = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navegacion("/Explorar"); 
    }
  }, []);
  return (
    <div>
     
        <Principal /> 
      
    </div>
  );
}

export default App;
