const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");

// Ruta para crear un nuevo contacto (formulario de contacto)
router.post("/", ContactController.createContact);

// Rutas adicionales (opcionales - para panel de administrador)
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;
