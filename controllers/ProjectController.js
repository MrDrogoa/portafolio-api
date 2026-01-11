const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/projects.json");

class ProjectController {
  // Leer datos del archivo JSON
  static async readData() {
    try {
      const data = await fs.readFile(DATA_PATH, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer datos: ${error.message}`);
    }
  }

  // GET /api/projects - Obtener todos los proyectos
  static async getAll(req, res) {
    try {
      const { categoria } = req.query;
      const data = await ProjectController.readData();
      let projects = data.projects;

      if (categoria) {
        projects = projects.filter((p) => p.categoria === categoria);
      }

      // Ordenar por campo 'orden' y luego por id
      projects = projects.sort((a, b) => {
        if (a.orden !== b.orden) return a.orden - b.orden;
        return a.id - b.id;
      });

      res.json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      console.error("Error en getAll:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/projects/:id - Obtener un proyecto por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await ProjectController.readData();
      const project = data.projects.find((p) => p.id === parseInt(id));

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        });
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      console.error("Error en getById:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/projects/:categoria/:slug - Obtener un proyecto por categoría y slug
  static async getByCategoryAndSlug(req, res) {
    try {
      const { categoria, slug } = req.params;
      const data = await ProjectController.readData();
      const project = data.projects.find(
        (p) => p.categoria === categoria && p.slug === slug
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        });
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      console.error("Error en getByCategoryAndSlug:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ProjectController;
