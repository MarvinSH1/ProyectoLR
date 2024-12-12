import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Probar conexión a la base de datos
testConnection();

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

// Configurar puerto y levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
