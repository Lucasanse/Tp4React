const prisma = require("../prisma/prismaClient");

// GET /api/favoritos 
const getFavoritos = async (req, res, next) => {
  try {
    // Tomamos el userId del token
    const userId = req.user.id;

    const favoritos = await prisma.favorite.findMany({
      where: { userId },
      include: { product: true }, // Incluir info del producto
    });

    const products = favoritos.map((fav) => fav.product);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getFavoritosChecker = async (req, res, next) => {
  try {
    // Tomamos el userId del token (req.user.id) en lugar de req.params
    const userId = req.user.id; 
    const productoId = parseInt(req.params.productoId, 10);

    if (isNaN(productoId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const favorito = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: productoId,
        },
      },
      include: { product: true },
    });

    if (!favorito) {
      return res.json(-1);
    }

    //  Devolvemos el objeto favorito para que el frontend pueda leer data.id
    res.json(favorito); 
  } catch (error) {
    next(error);
  }
};

// POST /api/favoritos (Agregar favorito)
const addFavorito = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const productId = parseInt(req.body.productId, 10);

    if (isNaN(productId)) {
      const error = new Error("ID de producto inválido");
      error.status = 400;
      return next(error);
    }

    // Validar que el elemento exista
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      const error = new Error("El elemento con id no existe.");
      error.status = 404; // 404 Not Found
      return next(error);
    }

    // Crear la relación
    const favorito = await prisma.favorite.create({
      data: {
        userId: userId,
        productId: productId,
      },
    });

    res.status(201).json(favorito); 
  } catch (error) {
    // Validar que el elemento no haya sido agregado previamente
    if (error.code === "P2002") {
      const conflictError = new Error("El favorito ya existe.");
      conflictError.status = 409; // 409 Conflict
      return next(conflictError);
    }
    next(error);
  }
};

// DELETE /api/favoritos/:productoId (Quitar favorito)
const removeFavorito = async (req, res, next) => {
  try {
    const userId = req.user.id; // Del token
    const productId = parseInt(req.params.productoId, 10);

    if (isNaN(productId)) {
      const error = new Error("ID de producto inválido");
      error.status = 400;
      return next(error);
    }

    // Validar que el favorito exista para el usuario autenticado
    const favoriteExists = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (!favoriteExists) {
      const error = new Error("El favorito no existe para ese usuario.");
      error.status = 404; // 404 Not Found
      return next(error);
    }

    // Eliminar la relación
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    res.status(200).json({ message: "Favorito eliminado correctamente" }); // 200 OK
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavoritos,
  addFavorito,
  removeFavorito,
  getFavoritosChecker,
};
