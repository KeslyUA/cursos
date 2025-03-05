require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "capacitacion",
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});


app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      res.json(results);
    });
  });

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
