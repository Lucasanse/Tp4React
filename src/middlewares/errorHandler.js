// 404
const notFound = (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Ruta no encontrada - ${req.originalUrl}`,
  });
};

// agarra los errores del next(error) en los controladores
const errorHandler = (err, req, res, next) => {
  // Solo logueamos en consola si es un error del servidor (500)
  if (!err.status || err.status === 500) {
    console.error(err.stack);
  }

  const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Error interno del servidor",
    // Si el error tiene detalles se muestra
    ...(err.errors && { errors: err.errors })
  });
};

module.exports = {
  notFound,
  errorHandler
};