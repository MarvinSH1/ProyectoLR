// src/controller/adminController.js
import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";

// funcion para ADD administrador                              FUNCIONAL
export const addAdmin = async (req, res) => {
  try {
    const { nombre, apaterno, amaterno, correo, contrasenia, telefono } =
      req.body;

    if (
      !nombre ||
      !apaterno ||
      !amaterno ||
      !correo ||
      !contrasenia ||
      !telefono
    ) {
      return res.status(400).json({ message: "Datos obligatorios" });
    }

    // verificar si el correo ya está registrado
    const checkQuery = "SELECT * FROM tbladmin WHERE correo=?";
    const [existingAdmin] = await pool.query(checkQuery, [correo]);

    if (existingAdmin.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);

    // Insertamos nuevo repartidor
    const rol = 1;
    const query =
      "INSERT INTO tbladmin (nombre, apaterno, amaterno, correo, contrasenia, telefono, idrol) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      nombre,
      apaterno,
      amaterno,
      correo,
      hashedPassword,
      telefono,
      rol,
    ]);
    console.log("Nuevo administrador agregado, ID:", result.insertId);
    return res.status(201).json({ id: result.insertId, nombre, correo });
  } catch (error) {
    console.error("Error en addAdmin", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
// funcion para GET administradores                             FUNCIONAL
export const getAdmins = async (req, res) => {
  try {
    const query = "SELECT * FROM tbladmin";
    const [rows] = await pool.query(query);
    console.log("Consulta getAdmins ejecutada con éxito");

    return res.json(rows);
  } catch (error) {
    console.error("Error en getAdmins:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
// funcion para PUT un administrador                           FUNCIONAL
export const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apaterno, amaterno, correo, contrasenia, telefono } =
      req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID del administrador es obligatorio" });
    }

    const query =
      "UPDATE tbladmin SET nombre=?, apaterno=?, amaterno=?, correo=?, contrasenia=?, telefono=? WHERE idadmin=?";
    const [result] = await pool.query(query, [
      nombre,
      apaterno,
      amaterno,
      correo,
      contrasenia,
      telefono,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    console.log(`Administrador con ID ${id} actualizado`);
    return res.json({ id, nombre, correo, telefono });
  } catch (error) {
    console.error("Error en editAdmin:", error);
    return res
      .status(500)
      .json({ message: "Error interno en el servidor backend" });
  }
};
// funcionar para DELETE administrador                          EN PROCESO
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id del repartidor obligatorio" });
    }
    const query = "DELETE FROM tbladmin WHERE idadmin=?";
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }
    console.log(`Administrador con id ${id} fue eliminado correctamente`);
    return res.json(`Administrador con id ${id} fue eliminado correctamente`);
  } catch (error) {
    console.error("Error en deleteADmin", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const methods = {
  addAdmin,
  getAdmins,
  editAdmin,
  deleteAdmin,
};
