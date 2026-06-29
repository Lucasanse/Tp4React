const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");
const { validateAuth } = require("../validations/entity.validation");
const { generarAccessToken } = require("../services/TokenService");

const register = async (req, res, next) => {
  try {
    // validar formatos
    const errors = validateAuth(req.body);
    if (errors.length > 0) {
      const error = new Error("Error de validación en los datos");
      error.status = 400;
      error.errors = errors;
      return next(error);
    }

    const { email, password } = req.body;
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar la contraseña en 8 steps
    const steps = 8;
    const passHasheada = await bcrypt.hash(password, steps);

    // Crear usuario con la versión hasheada de la contraseña
    const newUser = await prisma.user.create({
      data: {
        email,
        password: passHasheada,
      },
    });
    
    // Generar token igual que en login
    const accessToken = generarAccessToken(newUser);

    // Devolvemos el ID del usuario creado
    res.status(201).json({ id: newUser.id, email: newUser.email, accessToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar en la bd coincidencias del login
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.status = 401;
      return next(error);
    }

    // Comparar el codigo hash de la encriptacion con la antes guardada en la bd
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Credenciales inválidas");
      error.status = 401;
      return next(error);
    }
    const token = generarAccessToken(user);
    res.json({
      id: user.id,
      email: user.email,
      rol: user.rol,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // Obtenemos el ID extraído del token por el middleware
    const userId = req.user.id;

    // Buscamos los datos en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        rol: true
      },
    });

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    //  es una implementación básica de JWT sin refresh token en la BD
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, logout };
