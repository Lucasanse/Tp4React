const prisma = require("../prisma/prismaClient");


const getUsers = async (page, limit, email) => {
  let take, skip;

  if (limit) {
    take = parseInt(limit);
    skip = (parseInt(page || 1) - 1) * take;
  }

  const where = email ? { email: { contains: email, mode: "insensitive" } } : {};

  return await prisma.user.findMany({
    take,
    skip,
    where,
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data
  });
};

const deleteUser = async (id) => {
  const userToDelete = await prisma.user.findUnique({
    where: { id: Number(id) }
  })
  if(userToDelete){
    return await prisma.user.delete({
      where: { id: Number(id) }
    });
  }else{
    return null
  }
};

const actualizarUser = async (id, prod) => {
  const userToDelete = await prisma.user.findUnique({
    where: { id: Number(id) }
  })
  if(userToDelete){
    return await prisma.user.update({
    where: { id: Number(id) },
    data: prod,
  })
  } else {
    return null
  }
};



module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  actualizarUser
};