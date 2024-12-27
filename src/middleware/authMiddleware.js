// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ message: "Sin acceso autorizado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = decoded; // Adjunta los datos del usuario al objeto req
    next(); // Continúa al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
