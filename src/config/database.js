import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool de conexión
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Prueba de conexión
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release(); // Liberar conexión
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
};

export default testConnection;
