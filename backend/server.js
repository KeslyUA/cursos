require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
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
    console.log("solicitud recibida",req.body);
    const { usuario, contraseña } = req.body;
  
    try {
      const user = await prisma.usuarios.findUnique({
        where: { usuario },
      }); console.log("Usuario encontrado en BD:", user);
      if (!user || user.contraseña !== contraseña) {
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" }); 
      }
  
      res.json({ message: "Inicio de sesión exitoso", usuario: user.usuario });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
