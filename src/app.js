const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json()); 
app.use(errorHandler)

// Ruta de prueba (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

//test de errorHandler, descomentar si quieren testear

// app.get('/api/test-error', (req, res, next) => {
//   next(new Error('error de prueba'));
// });

module.exports = app;
