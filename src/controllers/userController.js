const userService = require("../services/usuarioService");
const { validateUser } = require("../validations/entity.validation");
const { generarAcessToken } = require("../services/TokenService"); // ajustá el path
const bcrypt = require("bcrypt");

const userNotFound = (next) => {
  const error = new Error("Usuario no encontrado");
  error.status = 404;
  return next(error);
};

const getAll = async (req, res, next) => {
  try {
    const { page, limit, email } = req.query;
    const users = await userService.getUsers(page, limit, email);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      const error = new Error("El ID proporcionado no es válido");
      error.status = 400;
      return next(error);
    }

    const user = await userService.getUserById(userId);
    if (!user) return userNotFound(next);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      const error = new Error("Error de validación en los datos");
      error.status = 400;
      error.errors = errors;
      return next(error);
    }

    const { id, ...safeData } = req.body;

    const newUser = await userService.createUser(safeData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error("Ya se encuentra un usuario con esa ID");
      err.status = 409;
      return next(err);
    }
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      const error = new Error("Error de validación en los datos");
      error.status = 400;
      error.errors = errors;
      return next(error);
    }

    // Verificar email duplicado
    const { email, password } = req.body;
    const existing = await userService.getUsers(undefined, undefined, email);
    if (existing.length > 0) {
      const error = new Error("El email ya está registrado");
      error.status = 409;
      return next(error);
    }

    // Hashear password y descartar id del body
    const hashedPassword = await bcrypt.hash(password, 10);
    const { id, ...safeData } = req.body;
    const newUser = await userService.createUser({ ...safeData, password: hashedPassword });

    // Generar token
    const accessToken = generarAcessToken(newUser);
    res.status(201).json({ user: newUser, accessToken });

  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error("Ya se encuentra un usuario con esa ID");
      err.status = 409;
      return next(err);
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) return userNotFound(next);
    res.json({ message: "Eliminado correctamente", data: deleted });
  } catch (error) {
    next(error);
  }
};

const actualizarUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      const error = new Error("Error de actualización de datos");
      error.status = 400;
      error.errors = errors;
      return next(error);
    }
    const updated = await userService.actualizarUser(id, req.body);
    if (!updated) return userNotFound(next);
    res.json({ message: "Actualizado correctamente", data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  register,
  deleteUser,
  actualizarUser,
};