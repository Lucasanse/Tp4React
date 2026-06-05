require('dotenv').config();
const express = require("express");
const cors = require("cors");

// Importación de Rutas
const productosRoute = require("./routes/productosRouter");

// Importación de Middlewares de Error
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Middlewares globales
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Ruta de prueba (Health Check)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API funcionando" });
});

// Ruta para testear el manejo de errores
app.get('/api/test-error', (req, res, next) => {
  next(new Error('error de prueba'));
});

// Enrutadores
app.use('/api/productos', productosRoute);

// Si la ruta no se encontró arriba, entra al notFound (404)
app.use(notFound);
// Si cualquier ruta hizo next(error), entra al errorHandler (500)
app.use(errorHandler);

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});