// src/controller/repartidorController.js
import { pool } from "../config/database.js";

// funcion para GET repartidores
export const getRepartidores = async (req, res) => {
  try {
    const query = "SELECT * FROM tblrepartidor";
    const [rows] = await pool.query(query);

    console.log("Consulta getRepartidores ejecutada con éxito");

    return res.json(rows);
  } catch (error) {
    console.error("Error en getRepartidores:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
// función para POST repartidor
export const addRepartidor = async (req, res) => {
  try {
    const { nombre, apaterno, amaterno, email, contrasenia, telefono } =
      req.body;

    if (
      !nombre ||
      !apaterno ||
      !amaterno ||
      !email ||
      !contrasenia ||
      !telefono
    ) {
      return res.status(400).json({ message: "Datos obligatorios" });
    }
    const query =
      "INSERT INTO tblrepartidor (nombre, apaterno, amaterno, email, contrasenia, telefono) VALUES (?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
    ]);

    console.log("Nuevo repartidor agregado, ID:", result.insertId);
    return res
      .status(201)
      .json({ id: result.insertId, nombre, apaterno, amaterno });
  } catch (error) {
    console.error("Error al agregar administrador:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
// función para PUT repartidor
export const editRepartidor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apaterno, amaterno, email, contrasenia, telefono } =
      req.body;

    if (!id) {
      return res.status(200).json({ message: "Id del repartidor obligatorio" });
    }

    const query =
      "UPDATE tblrepartidor SET nombre=?, apaterno=?, amaterno=?, email=?, contrasenia=?, telefono=? WHERE idrepartidor=?";
    const [result] = await pool.query(query, [
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Repartidor no encontrado" });
    }

    console.log(`Repartidor con id ${id} actualizado`);
    return res.json({ id, nombre, apaterno, amaterno, email });
  } catch (error) {
    console.error("Error en editRepartidor", error);
    return res
      .status(500)
      .json({ message: "Error interno en el servidor backend" });
  }
};
// función para eliminar un repartidor
export const deleteRepartidor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Id del repartidor es obligatorio" });
    }

    const query = "DELETE FROM tblrepartidor WHERE idrepartidor=?";
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Repartidor no encontrado" });
    }
    console.log(`Repartidor con id ${id} fue eliminado correctamente`);
    return res.json(`Repartidor ${id} eliminado correctamente`);
  } catch (error) {
    console.error("Error en DeleteRepartidor", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
