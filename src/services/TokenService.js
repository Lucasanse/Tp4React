const jwt = require("jsonwebtoken");

function generarAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.id,
      rol: user.rol,
    },
    process.env.SECRETITO_CLAVE,
    { expiresIn: "2d" },
  );
}

module.exports = { generarAccessToken };
