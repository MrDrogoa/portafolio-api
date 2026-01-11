const express = require("express");
const ProjectController = require("../controllers/ProjectController");

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Obtener todos los proyectos (opcionalmente filtrados por categoría)
 * @query   categoria - frontend | uxui | framework
 * @access  Public
 */
router.get("/", ProjectController.getAll);

/**
 * @route   GET /api/projects/:categoria/:slug
 * @desc    Obtener un proyecto por categoría y slug
 * @params  categoria - Categoría del proyecto
 * @params  slug - Slug del proyecto
 * @access  Public
 */
router.get("/:categoria/:slug", ProjectController.getByCategoryAndSlug);

/**
 * @route   GET /api/projects/:id
 * @desc    Obtener un proyecto por ID
 * @params  id - ID del proyecto
 * @access  Public
 */
router.get("/:id", ProjectController.getById);

module.exports = router;
