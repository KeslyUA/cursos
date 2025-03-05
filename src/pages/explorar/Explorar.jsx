import * as React from 'react';
import '../explorar/explorar.css'

const Explorar = () => {
    return (
         
            <div>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
            </style>
            <div className='fondo'>
                <div className='contenedor-uno'>
                <div className='titulo'>
                    <h1>Escuela de capacitacion empresarial </h1>
                    <h1>cursos de capacitacion para los colaboradores</h1>
                    <br />
                    <h3>Ingrese a la plataforma de capacitacion para recibir mas de 3000 cursos</h3>
                    
                </div>
                </div>
                
                <div className='contenedor-dos'>
                <h2 className='subtitulo'>cursos disponibles:</h2>
                <br />
                <div className='combo'>
                    <div className='box'>
                        <p>Seguridad Industrial</p>
                        <div className='img'></div>
                    </div>
                    <div className='box'>
                        <p>Seguridad Industrial</p>
                        <div className='img'></div>
                    </div>
                    <div className='box'>
                        <p>Seguridad Industrial</p>
                        <div className='img'></div>
                    </div>
                    <div className='box'>
                        <p>Seguridad Industrial</p>
                        <div className='img'></div>
                    </div>
                </div>
                
                </div>
            </div>
            </div>
                    
        
    )
}

export default Explorar