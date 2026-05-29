const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json()); 

// Ruta de prueba (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

module.exports = app;