require('dotenv').config();
const express = require("express");
const cors = require("cors");

// Importación de Rutas
const productosRoute = require("./routes/productosRouter");
const authRoute = require("./routes/authRouter"); 
const favoritesRoute = require("./routes/favoritosRouter"); 

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Bienvenido! API funcionando" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API funcionando" });
});

// Enrutadores
app.use('/api/productos', productosRoute);
app.use('/api/auth', authRoute);
app.use('/api/favoritos', favoritesRoute); 

// Si la ruta no se encontró arriba, entra al notFound (404)aa
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});