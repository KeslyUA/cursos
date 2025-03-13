
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const app = express();
const prisma = new PrismaClient();

//middlerware
const verificarToken = (rolesPermitidos) => {
  return (req, res, next) => {
    
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ error: "Acceso denegado. No hay token." });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(403).json({ error: "Acceso denegado. Token inválido." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");

      if (!rolesPermitidos.includes(decoded.cargo)) {
        return res.status(403).json({ error: "Acceso denegado. No tienes permisos." });
      }

      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  };
};




app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
}));
app.use(express.json());


// Obtener usuarios
app.get("/usuarios",verificarToken(["administrador"]), async (req, res) => {
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

    const token = jwt.sign(
      { id:user.id, usuario: user.usuario, cargo: user.cargo },
      process.env.JWT_SECRET || "secreto_super_seguro",
      { expiresIn: "2h" }
    );

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(" Error en login:", error);  
    res.status(500).json({ error: "Error en el servidor" });
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
app.post("/cursos",verificarToken(["administrador", "trabajador"]), async (req, res) => {
  try {
    console.log("Usuario autenticado en la ruta /cursos:", req.user);
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
      videoURL,
     } = req.body; 
     const idUsuario = req.user.id;
    
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
        videoURL,
        idUsuario
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

