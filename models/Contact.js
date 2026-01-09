const db = require("../config/database");

class Contact {
  // Crear un nuevo contacto
  static async create(contactData) {
    const { nombre, email, mensaje } = contactData;

    try {
      const query = `
        INSERT INTO contactos (nombre, email, mensaje)
        VALUES (?, ?, ?)
      `;

      const [result] = await db.query(query, [nombre, email, mensaje]);

      return {
        success: true,
        id: result.insertId,
        message: "Mensaje enviado correctamente",
      };
    } catch (error) {
      console.error("Error al crear contacto:", error);
      throw error;
    }
  }

  // Obtener todos los contactos (opcional - para ver mensajes desde admin)
  static async getAll() {
    try {
      const query = "SELECT * FROM contactos ORDER BY fecha_creacion DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      throw error;
    }
  }

  // Obtener un contacto por ID (opcional)
  static async getById(id) {
    try {
      const query = "SELECT * FROM contactos WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error al obtener contacto:", error);
      throw error;
    }
  }

  // Eliminar un contacto (opcional)
  static async delete(id) {
    try {
      const query = "DELETE FROM contactos WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      throw error;
    }
  }
}

module.exports = Contact;
