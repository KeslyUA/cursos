
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
}));
app.use(express.json());

//este es para enviar mensaje cuando expire la sesion
const api = axios.create({
  baseURL: "http://localhost:3001", 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      localStorage.removeItem("token"); 
      window.location.href = "/explorar"; 
    }
    return Promise.reject(error);
  }
);

export default api;

//middlerware
const verificarToken = (rolesPermitidos) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
 

  if (!authHeader) {
    return res.status(403).json({ error: "Acceso denegado, token requerido" });
  }

  const token = authHeader.split(" ")[1]; 
  
  if (!token) {
    return res.status(403).json({ error: "Acceso denegado, token no válido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");

    if (!rolesPermitidos.includes(decoded.cargo)) {
      return res.status(403).json({ error: "Acceso denegado, rol no autorizado" });
    }
    req.user = decoded; 

    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};


// Configuración de almacenamiento para videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });



// Obtener usuarios
app.get("/usuarios",verificarToken(["administrador", "trabajador"]), async (req, res) => {
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
    const user = await prisma.usuarios.findFirst({
      where: { usuario:usuario },
    });


    if (!user || user.contraseña !== contraseña) {
      console.log("Usuario o contraseña incorrectos");
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id:user.id, usuario: user.usuario, cargo: user.cargo },
      process.env.JWT_SECRET || "secreto_super_seguro",
      { expiresIn: "10h" }
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//para guardar los cursos
app.post("/cursos", verificarToken(["administrador", "trabajador"]), upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Debes subir un archivo de video." });
    }

    const videoURL = `http://localhost:3001/uploads/${req.file.filename}`;

    const { titulo, 
      descripcion,
      area,
      duracion,
      fechaPublica,
      fechaCierre,
      certificado,
      cursoLibre,
      evaluacion,
      obligatorio } = req.body;
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
        idUsuario,
      },
    });

    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error("Error al agregar curso:", error);
    res.status(500).json({ error: "Error al agregar curso" });
  }
});


//ruta para obtener todos los videos

app.get("/videos",async(req,res)=>{

  const videos=await prisma.cursos.findMany();
  res.json(videos);
})
  
//para filtrar cursos por usuario
app.get("/publicaciones", verificarToken(["administrador", "trabajador"]), async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      console.error("Error: req.user no tiene una propiedad 'id'");
      return res.status(400).json({ error: "ID de usuario no encontrado en el token" });
    }

    const idUsuario = req.user.id;

    const cursos = await prisma.cursos.findMany({
      where: { idUsuario: idUsuario },
    });

    if (cursos.length === 0) {
      return res.status(404).json({ message: "No hay cursos para este usuario" });
    }

    res.json(cursos);
  } catch (error) {
    console.error("Error al obtener los cursos del usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//obtener participantes
app.get("/usuarios", async (req, res) => {
  try {
    const participantes = await prisma.usuarios.findMany();
    res.json(participantes); 
  } catch (error) {
  console.error("Error en la consulta de cursos:", error); 
  res.status(500).json({ error: error.message }); 
  }
});


//para guardar cursos seleccionados
app.post("/agregados", verificarToken(["administrador", "trabajador"]), async (req, res) => {
  try {
      const { idCurso } = req.body;
      if (!idCurso) {
          return res.status(400).json({ error: "ID del curso es requerido" });
      }

      const idUsuario = req.user.id; 
      const cursoExistente = await prisma.agregados.findFirst({
        where: {
            idUsuario: idUsuario,
            idCurso: idCurso,
        },
      });

    if (cursoExistente) {
        return res.status(400).json({ error: "El curso ya fue agregado" });
    }
      const cursoAgregado = await prisma.agregados.create({
          data: {
              idUsuario: idUsuario,
              idCurso: idCurso,
          },
      });
        console.log("si esta",cursoExistente)
      res.json(cursoAgregado);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
//eliminar curso
app.delete("/cursos/:id", async (req, res) => {
  const { id } = req.params;
  try {
      await prisma.cursos.delete({
          where: { id: parseInt(id) }
      });
      res.status(200).json({ message: "Curso eliminado con éxito" });
  } catch (error) {
      res.status(500).json({ error: "Error al eliminar el curso" });
  }
});


//obtener agregados

app.get("/agregados", verificarToken(["administrador", "trabajador"]), async (req, res) => {
  try {
      if (!req.user || !req.user.id) {
          return res.status(400).json({ error: "ID de usuario no encontrado en el token" });
      }
      const idUsuario = req.user.id; 

      const cursosAgregados = await prisma.agregados.findMany({
          where: { idUsuario: idUsuario },
          include: {
              curso: true,
          },
      });
      res.json(cursosAgregados);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//eliminar agregado

app.delete("/agregados/:idCurso", verificarToken(["administrador", "trabajador"]), async (req, res) => {
  try {
      const { idCurso } = req.params;
      const idUsuario = req.user.id;
      if (!idCurso) {
          return res.status(400).json({ error: "ID del curso es requerido" });
      }

      const cursoExistente = await prisma.agregados.findFirst({
          where: { idUsuario, idCurso: Number(idCurso) }
      });

      if (!cursoExistente) {
          return res.status(404).json({ error: "Curso no encontrado en la lista de agregados" });
      }

      await prisma.agregados.delete({
          where: { id: cursoExistente.id }
      });

      res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//api para guardar evaluacion

app.post("/evaluaciones", verificarToken(["administrador"]), async (req, res) => {
  try {
      const { titulo, alternativas,idCurso } = req.body;
      const idUsuario = req.user.id; 
      
      console.log("Datos recibidos:", req.body);

      const nuevaPregunta = await prisma.pregunta.create({
        
          data: {
              titulo,
              usuario: { connect: { id: idUsuario } },
              curso: { connect: { id: idCurso } }, 
              alternativas: {
                  create: alternativas.map((alt) => ({
                      texto: alt.texto,
                      seleccionada: alt.seleccionada,
                  })),
              },
          },
          include: { alternativas: true },
      });
      res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error("Error al guardar la evaluación:", error.message, error.meta);
    res.status(500).json({ error: error.message });
  }
});

//guardar participantes
app.post("/participantesAgregados",async(req,res) =>{
  try{
    const {participantes,idCurso} =req.body;
  
    const nuevosparticipantes=await prisma.participante.createMany({
      data: participantes.map(p => ({
        idUsuario: p.idUsuario,
        idCurso:idCurso,
      })),
    }
    );
    res.json({message:"participantes guardados en base",nuevosparticipantes})

  }catch(error){
      res.status(500).json({message:"error al guardar participantes"})
  }
})
//participantes
app.get("/participantes", async (req, res) => {
  try {
    const participantes = await prisma.participante.findMany();
    res.json(participantes); 
  } catch (error) {
  console.error("Error en la consulta de participantes:", error); 
  res.status(500).json({ error: error.message }); 
  }
});

//evaluaciones

app.get("/preguntas",async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");console.log("decode",decoded)
    const userId = decoded.id;
    const participantes = await prisma.participante.findMany({
      where: { idUsuario: userId },
      select: { idCurso: true }
    });

    const cursosIds = participantes.map((p) => p.idCurso); 
    const evaluaciones = await prisma.pregunta.findMany({
      where: { idCurso: { in: cursosIds }, },
      include: {
        curso : {
          select : {titulo:true}
        }
      }
    });
    
    res.json(evaluaciones); 
    
    
    console.log("nose",evaluaciones)
  } catch (error) {
  console.error("Error en la consulta de evaluacion:", error); 
  res.status(500).json({ error: error.message }); 
  }
});
//traer alternativas
app.get("/alternativas", async (req, res) => {
  try {
    const { idPreguntas } = req.query; 

    let alternativas;
    if (idPreguntas) {
      alternativas = await prisma.alternativa.findMany({
        where: { idPreguntas: parseInt(idPreguntas) } 
      });
    } 

    res.json(alternativas);
  } catch (error) {
    console.error("Error en la consulta de alternativas:", error);
    res.status(500).json({ error: "Error al obtener alternativas" });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);

});

