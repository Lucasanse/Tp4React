const express = require("express");
const router = express.Router();
const favoritosController = require("../controllers/favoritosController");

router.get("/:userId", favoritosController.getFavoritos);
router.get(
  "/checker/:userId/:productoId",
  favoritosController.getFavoritosChecker,
);
router.post("/", favoritosController.addFavorito);
router.delete("/", favoritosController.removeFavorito);

module.exports = router;
