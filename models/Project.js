const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/projects.json");

class ProjectModel {
  // Leer datos del archivo JSON
  static async readData() {
    try {
      const data = await fs.readFile(DATA_PATH, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, crear estructura inicial
      if (error.code === "ENOENT") {
        const initialData = { projects: [], nextId: 1 };
        await this.writeData(initialData);
        return initialData;
      }
      throw new Error(`Error al leer datos: ${error.message}`);
    }
  }

  // Escribir datos en el archivo JSON
  static async writeData(data) {
    try {
      await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      throw new Error(`Error al escribir datos: ${error.message}`);
    }
  }

  // Obtener todos los proyectos (opcionalmente filtrados por categoría)
  static async getAll(categoria = null) {
    try {
      const data = await this.readData();
      let projects = data.projects;

      if (categoria) {
        projects = projects.filter((p) => p.categoria === categoria);
      }

      // Ordenar por campo 'orden' y luego por id
      return projects.sort((a, b) => {
        if (a.orden !== b.orden) return a.orden - b.orden;
        return a.id - b.id;
      });
    } catch (error) {
      throw new Error(`Error al obtener proyectos: ${error.message}`);
    }
  }

  // Obtener un proyecto por ID
  static async getById(id) {
    try {
      const data = await this.readData();
      const project = data.projects.find((p) => p.id === parseInt(id));
      return project || null;
    } catch (error) {
      throw new Error(`Error al obtener proyecto: ${error.message}`);
    }
  }

  // Obtener un proyecto por categoría y slug
  static async getByCategoryAndSlug(categoria, slug) {
    try {
      const data = await this.readData();
      const project = data.projects.find(
        (p) => p.categoria === categoria && p.slug === slug
      );
      return project || null;
    } catch (error) {
      throw new Error(`Error al obtener proyecto: ${error.message}`);
    }
  }

  // Crear un nuevo proyecto
  static async create(projectData) {
    try {
      const data = await this.readData();

      const newProject = {
        id: data.nextId,
        titulo: projectData.titulo,
        descripcion: projectData.descripcion,
        categoria: projectData.categoria,
        tecnologias: projectData.tecnologias || [],
        github_url: projectData.github_url || null,
        demo_url: projectData.demo_url || null,
        orden: projectData.orden || data.projects.length + 1,
        images: projectData.images || [],
      };

      data.projects.push(newProject);
      data.nextId++;

      await this.writeData(data);
      return newProject;
    } catch (error) {
      throw new Error(`Error al crear proyecto: ${error.message}`);
    }
  }

  // Actualizar un proyecto existente
  static async update(id, projectData) {
    try {
      const data = await this.readData();
      const index = data.projects.findIndex((p) => p.id === parseInt(id));

      if (index === -1) {
        return null;
      }

      // Mantener el ID original y actualizar campos proporcionados
      const updatedProject = {
        ...data.projects[index],
        titulo:
          projectData.titulo !== undefined
            ? projectData.titulo
            : data.projects[index].titulo,
        descripcion:
          projectData.descripcion !== undefined
            ? projectData.descripcion
            : data.projects[index].descripcion,
        categoria:
          projectData.categoria !== undefined
            ? projectData.categoria
            : data.projects[index].categoria,
        tecnologias:
          projectData.tecnologias !== undefined
            ? projectData.tecnologias
            : data.projects[index].tecnologias,
        github_url:
          projectData.github_url !== undefined
            ? projectData.github_url
            : data.projects[index].github_url,
        demo_url:
          projectData.demo_url !== undefined
            ? projectData.demo_url
            : data.projects[index].demo_url,
        orden:
          projectData.orden !== undefined
            ? projectData.orden
            : data.projects[index].orden,
        images:
          projectData.images !== undefined
            ? projectData.images
            : data.projects[index].images,
      };

      data.projects[index] = updatedProject;
      await this.writeData(data);
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al actualizar proyecto: ${error.message}`);
    }
  }

  // Eliminar un proyecto
  static async delete(id) {
    try {
      const data = await this.readData();
      const initialLength = data.projects.length;

      data.projects = data.projects.filter((p) => p.id !== parseInt(id));

      if (data.projects.length === initialLength) {
        return false; // No se encontró el proyecto
      }

      await this.writeData(data);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar proyecto: ${error.message}`);
    }
  }
}

module.exports = ProjectModel;
