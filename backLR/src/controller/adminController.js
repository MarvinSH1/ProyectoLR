// src/controller/adminController.js

import testConnection from "../config/database.js";

import { pool } from "../config/database.js";

// funcion para GET administradores                             FUNCIONAL
export const getAdmins = async (req, res) => {
  try {
    const query = "SELECT * FROM tbladmin";
    const [rows] = await pool.query(query);
    console.log("Consulta getAdmins ejecutada con éxito");

    return res.json(rows);
  } catch (error) {
    console.error("Error en getAdmins:", error);
    return res.status(500).json({ message: "Error interno del servidor xd" });
  }
};
// funcion para PUT un administrador                           FUNCIONAL
export const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apaterno,
      amaterno,
      correo,
      contrasenia,
      fotoperfil,
      telefono,
    } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID del administrador es obligatorio" });
    }

    const query =
      "UPDATE tbladmin SET nombre=?, apaterno=?, amaterno=?, correo=?, contrasenia=?, fotoperfil=?, telefono=? WHERE idadmin=?";
    const [result] = await pool.query(query, [
      nombre,
      apaterno,
      amaterno,
      correo,
      contrasenia,
      fotoperfil,
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

export const methods = {
  getAdmins,
  editAdmin,
};
