
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();


app.use(cors({
  origin: "http://localhost:5173", // Permite solo este origen (React Vite)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  credentials: true, // Permite enviar cookies o credenciales
}));
app.use(express.json());


// Obtener usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });

  }
});


// Iniciar sesión
app.post("/login", async (req, res) => {
  console.log("Solicitud recibida:", req.body);

  const { usuario, contraseña } = req.body;

  try {
    console.log("Buscando usuario en la base de datos...");
    const user = await prisma.usuarios.findFirst({
      where: { usuario:usuario },
    });

    console.log("Usuario encontrado:", user);

    if (!user || user.contraseña !== contraseña) {
      console.log("Usuario o contraseña incorrectos");
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    res.json({ message: "Inicio de sesión exitoso", usuario: user.usuario });

  } catch (error) {
    console.error(" Error en login:", error);  
    res.status(500).json({ error: error.message });
  }
});
// Ruta para obtener los cursos
app.get("/cursos", async (req, res) => {
  try {
    const cursos = await prisma.cursos.findMany();
    res.json(cursos); 
  } catch (error) {
  console.error("Error en la consulta de cursos:", error); 
  res.status(500).json({ error: error.message }); 
  }
});

//para guardar los cursos
app.post("/cursos", async (req, res) => {
  try {
    const { titulo, 
      descripcion, 
      area,
      duracion,
      fechaPublica,
      fechaCierre,
      certificado,
      cursoLibre,
      evaluacion,
      obligatorio,
      videoURL
     } = req.body; 

    
    const nuevoCurso = await prisma.cursos.create({
      data: {
        titulo,
        descripcion,
        area,
        duracion,
        fechaPublica: fechaPublica ? new Date(fechaPublica) : null, 
        fechaCierre: fechaCierre ? new Date(fechaCierre) : null,
        certificado,
        cursoLibre,
        evaluacion,
        obligatorio,
        videoURL
      },
    });

    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: "Error al agregar curso" });
  }
});
  
//opcional recibir url youtube
app.post("/guardar-url-video", async (req, res) => {
  const { videoURL } = req.body;

  try {
    const nuevoCurso = await prisma.cursos.create({
      data: {
        videoURL: videoURL  // Guardar la URL en MySQL
      }
    });

    res.json({ mensaje: "URL guardada", videoURL: nuevoCurso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la URL" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);

});
