const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); 
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();

//configuraciones de prisma
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }); 

// MIDDLEWARES
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json()); 



// Ruta de prueba (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

//Obtener producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el ID sea un número válido antes de consultar
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "El ID proporcionado no es válido" });
    }

    // Buscar el producto en la base de datos usando Prisma
    const producto = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    // Si el juguete/producto no existe, devolver código 404
    if (!producto) {
      return res.status(404).json({ message: "Juguete no encontrado" });
    }

    // Si existe, devolver el producto con código 200 (por defecto)
    res.json(producto);
    
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = app;