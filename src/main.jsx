import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from 'react';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <App />
     </BrowserRouter>
  </StrictMode>,
)
