const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas mapeadas a su respectivo controlador

router.get("/", userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post("/register", userController.register);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.actualizarUser);

module.exports = router;
