const Contact = require("../models/Contact");

class ContactController {
  // Crear un nuevo mensaje de contacto
  static async createContact(req, res) {
    try {
      const { nombre, email, mensaje } = req.body;

      // Validación básica
      if (!nombre || !email || !mensaje) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos",
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "El formato del email no es válido",
        });
      }

      // Crear el contacto en la base de datos
      const result = await Contact.create({ nombre, email, mensaje });

      res.status(201).json({
        success: true,
        message: "¡Gracias por tu mensaje! Te contactaré pronto.",
        data: {
          id: result.id,
        },
      });
    } catch (error) {
      console.error("Error al crear contacto:", error);
      res.status(500).json({
        success: false,
        message: "Error al procesar tu mensaje. Intenta nuevamente.",
      });
    }
  }

  // Obtener todos los contactos (para vista de administrador)
  static async getAllContacts(req, res) {
    try {
      const contacts = await Contact.getAll();

      res.json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener los contactos",
      });
    }
  }

  // Obtener un contacto por ID
  static async getContactById(req, res) {
    try {
      const { id } = req.params;
      const contact = await Contact.getById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contacto no encontrado",
        });
      }

      res.json({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error("Error al obtener contacto:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener el contacto",
      });
    }
  }

  // Eliminar un contacto
  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Contact.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Contacto no encontrado",
        });
      }

      res.json({
        success: true,
        message: "Contacto eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar el contacto",
      });
    }
  }
}

module.exports = ContactController;
