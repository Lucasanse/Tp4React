const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

// Rutas mapeadas a su respectivo controlador
router.get("/", productosController.getAll);
router.get('/:id', productosController.getById);
router.post('/', productosController.create);

module.exports = router;
