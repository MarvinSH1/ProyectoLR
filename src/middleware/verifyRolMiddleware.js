// src/middleware/verifyRolMiddleware.js
const verifyRole = (requireRole) => {
  return (req, res, next) => {
    // Asegurarse de que los datos del usuario estén disponibles
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: usuario no autenticado" });
    }
    // Verificar el rol del usuario
    if (req.user.rol !== requireRole) {
      return res
        .status(403)
        .json({ message: `Acceso denegado: rol no autorizado` });
    }
    next(); // Si el rol es válido, continuar con el siguiente middleware o controlador
  };
};

export default verifyRole;
