const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const app = express();

// Middlewares
//configuraciones de prisma
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

router.get("/", async (req, res) => {
  try {
    let productos = null;
    //Le decimos que si no viene algo
    const { page, limit, name } = req.query;
    //Declaramos en vacio take y skip
    let take, skip;

    // Si limit existe, calculamos paginación
    if (limit) {
      take = parseInt(limit);
      skip = (parseInt(page || 1) - 1) * take;
    }
    //Formato para el where en prisma
    const where = name ? { name: { contains: name, mode: "insensitive" } } : {};

    productos = await prisma.product.findMany({
      take,
      skip,
      where,
    });

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;
