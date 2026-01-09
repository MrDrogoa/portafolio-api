const ProjectModel = require("../models/Project");

class ProjectController {
  // GET /api/projects - Obtener todos los proyectos
  static async getAll(req, res) {
    try {
      const { categoria } = req.query;
      const projects = await ProjectModel.getAll(categoria);

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
      const project = await ProjectModel.getById(id);

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
      const project = await ProjectModel.getByCategoryAndSlug(categoria, slug);

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

  // POST /api/projects - Crear un nuevo proyecto
  static async create(req, res) {
    try {
      const {
        titulo,
        descripcion,
        categoria,
        tecnologias,
        github_url,
        demo_url,
        orden,
        images,
      } = req.body;

      // Validaciones básicas
      if (!titulo || !descripcion || !categoria) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos: titulo, descripcion, categoria",
        });
      }

      const validCategories = ["frontend", "uxui", "framework"];
      if (!validCategories.includes(categoria)) {
        return res.status(400).json({
          success: false,
          message: "Categoría inválida. Debe ser: frontend, uxui o framework",
        });
      }

      const projectData = {
        titulo,
        descripcion,
        categoria,
        tecnologias: tecnologias || [],
        github_url,
        demo_url,
        orden: orden || 0,
        images: images || [],
      };

      const newProject = await ProjectModel.create(projectData);

      res.status(201).json({
        success: true,
        message: "Proyecto creado exitosamente",
        data: newProject,
      });
    } catch (error) {
      console.error("Error en create:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/projects/:id - Actualizar un proyecto
  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        titulo,
        descripcion,
        categoria,
        tecnologias,
        github_url,
        demo_url,
        orden,
        images,
      } = req.body;

      // Validar categoría si se proporciona
      if (categoria) {
        const validCategories = ["frontend", "uxui", "framework"];
        if (!validCategories.includes(categoria)) {
          return res.status(400).json({
            success: false,
            message: "Categoría inválida. Debe ser: frontend, uxui o framework",
          });
        }
      }

      const projectData = {
        titulo,
        descripcion,
        categoria,
        tecnologias,
        github_url,
        demo_url,
        orden,
        images,
      };

      const updatedProject = await ProjectModel.update(id, projectData);

      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        });
      }

      res.json({
        success: true,
        message: "Proyecto actualizado exitosamente",
        data: updatedProject,
      });
    } catch (error) {
      console.error("Error en update:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE /api/projects/:id - Eliminar un proyecto
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ProjectModel.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        });
      }

      res.json({
        success: true,
        message: "Proyecto eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error en delete:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ProjectController;
