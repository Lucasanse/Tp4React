const prisma = require("../prisma/prismaClient");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear usuario con contraseña plana
    const newUser = await prisma.user.create({
      data: { email, password }
    });

    // Devolvemos el ID del usuario creado
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

   
    if (!user || user.password !== password) {
      const error = new Error("Credenciales inválidas");
      error.status = 401;
      return next(error);
    }

    
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };