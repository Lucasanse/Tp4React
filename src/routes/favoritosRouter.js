const express = require("express");
const router = express.Router();
const favoritosController = require("../controllers/favoritosController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Exigir autenticación para TODAS las rutas de favoritos
router.use(verificarToken);


router.get("/", favoritosController.getFavoritos);
router.post("/", favoritosController.addFavorito);
router.delete("/:productoId", favoritosController.removeFavorito);
router.get("/checker/:productoId", favoritosController.getFavoritosChecker);

module.exports = router;
