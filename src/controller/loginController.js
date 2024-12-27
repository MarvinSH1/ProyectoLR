//src/controller/loginController.js
import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    // validar campos
    if (!email || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Contraseña y correo obligatorios" });
    }

    let user = null;
    let role = null;

    // Buscar en la tabla de administradores

    const adminQuery = `
    SELECT c.*, r.rol 
    FROM tbladmin c
    JOIN roles r ON c.idrol = r.idrol
    WHERE c.correo = ?
     `;
    const [adminRows] = await pool.query(adminQuery, [email]);

    if (adminRows.length > 0) {
      user = adminRows[0];
      role = "admin";
    }

    // Si no es administrador, buscar en la tabla de clientes
    if (!user) {
      const clienteQuery = `
        SELECT c.*, r.rol 
        FROM tblcliente c
        JOIN roles r ON c.idrol=r.idrol
        WHERE c.email = ?
      `;
      const [clienteRows] = await pool.query(clienteQuery, [email]);

      if (clienteRows.length > 0) {
        user = clienteRows[0];
        role = "cliente";
      }
    }

    // Si no es cliente, buscar en la tabla de repartidores
    if (!user) {
      const repartidorQuery = `
        SELECT c.*, r.rol
        FROM tblrepartidor c
        JOIN roles r ON c.idrol=r.idrol
        WHERE c.email = ?
      `;
      const [repartidorRows] = await pool.query(repartidorQuery, [email]);

      if (repartidorRows.length > 0) {
        user = repartidorRows[0];
        role = "repartidor";
      }
    }
    // Si no se encuentra el usuario en ninguna tabla
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // comparar contraseñas
    const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // generar token JWT
    const token = jwt.sign(
      {
        id: user.idcliente,
        rol: user.rol,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(
      `El usuario ${user.idcliente} ${user.nombre} con correo ${user.email} y rol ${user.rol} ha iniciado sesión`
    );
    return res.json({
      token,
      cliente: {
        id: user.idcliente,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en loginController:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
export const methods = {
  login,
};
