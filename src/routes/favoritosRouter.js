const express = require("express");
const router = express.Router();
const favoritosController = require("../controllers/favoritosController"); 

router.get("/:userId", favoritosController.getFavoritos);
router.post("/", favoritosController.addFavorito);
router.delete("/", favoritosController.removeFavorito);

module.exports = router;