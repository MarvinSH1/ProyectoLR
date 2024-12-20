// src/controller/registroController.js
import bcrypt from "bcryptjs";
import { pool } from "../config/database.js";

export const registrar = async (req, res) => {
  try {
    const {
      _nombre,
      _apaterno,
      _amaterno,
      _email,
      _contrasenia,
      _telefono,
      _direccion,
    } = req.body;

    // Validar campos obligatorios
    if (
      !_nombre ||
      !_apaterno ||
      !_amaterno ||
      !_email ||
      !_contrasenia ||
      !_telefono ||
      !_direccion
    ) {
      return res.status(400).json({ message: "Datos obligatorios" });
    }

    // Verificar si el correo ya está registrado
    const checkQuery = "SELECT * FROM tblcliente WHERE email = ?";
    const [existingUser] = await pool.query(checkQuery, [_email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(_contrasenia, salt);

    // Insertar nuevo cliente en la base de datos
    const idrol = 3;

    const insertQuery = `INSERT INTO tblcliente (
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      direccion,
      idrol
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const [result] = await pool.query(insertQuery, [
      _nombre,
      _apaterno,
      _amaterno,
      _email,
      hashedPassword,
      _telefono,
      _direccion,
      idrol,
    ]);

    console.log("Nuevo cliente registrado con ID:", result.insertId);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Registro exitoso",
      cliente: {
        id: result.insertId,
        _nombre,
        _email,
        _telefono,
      },
    });
  } catch (error) {
    console.error("Error en registerClient:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const methods = {
  registrar,
};
