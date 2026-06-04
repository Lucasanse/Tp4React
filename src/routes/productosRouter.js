const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { validateProduct } = require("../validations/entity.validation");

const app = express();

// Middlewares
//configuraciones de prisma


let connectionString = process.env.DATABASE_URL;
if (connectionString && connectionString.includes('sslmode=require')) {
  connectionString = connectionString.replace('sslmode=require', 'sslmode=verify-full');
}
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

// Obtener producto por ID 
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    
    if (isNaN(productId)) {
      return res.status(400).json({ error: "El ID proporcionado no es válido" });
    }

    const producto = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!producto) {
      return res.status(404).json({ message: "Juguete no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
});

// POST: Crear nuevo producto 
router.post('/', async (req, res, next) => {
  try {
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, avatar, description, price, stock } = req.body;

    const newProduct = await prisma.product.create({
      data: { name, avatar, description, price, stock }
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
