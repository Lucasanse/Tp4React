const prisma = require("../prisma/prismaClient");

// GET /api/favoritos/:userId -> Obtiene todos los favoritos de un usuario
const getFavoritos = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    
    if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
    }

    const favoritos = await prisma.favorite.findMany({
      where: { userId },
      include: { product: true } 
    });

    const products = favoritos.map(fav => fav.product);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// POST /api/favoritos -> Agrega un producto a favoritos
const addFavorito = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const favorito = await prisma.favorite.create({
      data: {
        userId: parseInt(userId, 10),
        productId: parseInt(productId, 10)
      }
    });

    res.status(201).json(favorito);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "El producto ya está en favoritos" });
    }
    next(error);
  }
};

// DELETE /api/favoritos -> Elimina un producto de favoritos
const removeFavorito = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    await prisma.favorite.deleteMany({
      where: {
        userId: parseInt(userId, 10),
        productId: parseInt(productId, 10)
      }
    });

    res.json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavoritos, addFavorito, removeFavorito };