const express = require("express");
const cors = require("cors");

//Routes
const productosRoute = require("./routes/productosRouter");

const app = express();

// configuraciones de prisma
let connectionString = process.env.DATABASE_URL;
if (connectionString && connectionString.includes('sslmode=require')) {
  connectionString = connectionString.replace('sslmode=require', 'sslmode=verify-full');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// MIDDLEWARES
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Ruta de prueba (Health Check)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente",
  });
});

app.use("/api/productos", productosRoute);

module.exports = app;
