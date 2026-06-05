const prisma = require("../prisma/prismaClient");

const getProductos = async (page, limit, name) => {
  let take, skip;

  if (limit) {
    take = parseInt(limit);
    skip = (parseInt(page || 1) - 1) * take;
  }

  const where = name ? { name: { contains: name, mode: "insensitive" } } : {};

  return await prisma.product.findMany({
    take,
    skip,
    where,
  });
};

const getProductoById = async (id) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

const createProducto = async (data) => {
  return await prisma.product.create({
    data
  });
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto
};