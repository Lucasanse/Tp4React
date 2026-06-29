const jwt = require("jsonwebtoken");

// Verifica Firma, Caducidad y lee el Payload
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token no proporcionado o formato inválido");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    // jwt.verify hace 3 cosas:
    // Verifica la firma con SECRETITO_CLAVE.
    // Verifica que no haya caducado.
    // Devuelve el payload decodificado.
    const payload = jwt.verify(token, process.env.SECRETITO_CLAVE);

    // Guardamos el payload en la request para que los controladores puedan usarlo
    req.user = payload; 
    
    next();
  } catch (err) {
    // Si el token caduco, jsonwebtoken lanza un error específico
    if (err.name === "TokenExpiredError") {
      const error = new Error("El token de acceso ha caducado");
      error.status = 401;
      return next(error);
    }
    
    // Si la firma es inválida o el token fue modificado
    const error = new Error("Token inválido");
    error.status = 403;
    next(error);
  }
};

// Verifica el Rol
const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    // Verificamos si el rol guardado en el payload coincide con el requerido
    if (!req.user || req.user.rol !== rolRequerido) {
      const error = new Error("Acceso denegado. Rol insuficiente.");
      error.status = 403; // 403 Forbidden
      return next(error);
    }
    next();
  };
};

module.exports = { verificarToken, verificarRol };