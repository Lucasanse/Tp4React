const express = require("express");
const cors = require("cors");

// Routes
const productosRoute = require("./routes/productosRouter");
// Middlewares
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Ruta de prueba (Health Check)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API funcionando" });
});

// para testear el error de prueba
app.get('/api/test-error', (req, res, next) => {
  next(new Error('error de prueba'));
});

app.use('/api/productos', productosRoute);
app.use(errorHandler);

module.exports = app;