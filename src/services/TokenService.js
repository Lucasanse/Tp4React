const jwt = require("jsonwebtoken");

function generarAcessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email, 
      rol: user.rol,     
    },
    process.env.SECRETITO_CLAVE,
    { expiresIn: "2d" }, 
  );
}

module.exports = { generarAcessToken };