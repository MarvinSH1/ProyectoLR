import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./src/config/database.js";

import adminRoutes from "./src/routes/adminRoutes.js";
import repartidorRoutes from "./src/routes/repartidorRoutes.js";
import registroRoutes from "./src/routes/registroRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";

const app = express();
dotenv.config();

// Probar conexión a la base de datos
testConnection();

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

//rutas
app.use("/api", adminRoutes); //administrador
app.use("/api/repartidor", repartidorRoutes); //repartidor
app.use("/api/cliente", registroRoutes); //registro para cliente
app.use("/api", loginRoutes); //Inicio de sesión

// Configurar puerto y levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
