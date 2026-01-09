-- =============================================
-- SCRIPT SQL PARA BASE DE DATOS DEL PORTAFOLIO
-- =============================================
-- Este script crea las tablas necesarias para tu aplicación
-- Ejecútalo en phpMyAdmin de cPanel

-- =============================================
-- TABLA: contactos
-- Almacena los mensajes del formulario de contacto
-- =============================================
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: projects (si usas MySQL para proyectos)
-- Actualmente la API usa projects.json, pero puedes migrar a MySQL
-- =============================================
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `categoria` ENUM('frontend', 'disenouxui', 'framework') NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `imagen` VARCHAR(500) DEFAULT NULL,
  `url_demo` VARCHAR(500) DEFAULT NULL,
  `url_github` VARCHAR(500) DEFAULT NULL,
  `tecnologias` JSON DEFAULT NULL,
  `destacado` TINYINT(1) DEFAULT 0,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_slug` (`slug`),
  KEY `idx_categoria` (`categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- VERIFICAR TABLAS CREADAS
-- =============================================
SHOW TABLES;

-- =============================================
-- VER ESTRUCTURA DE contactos
-- =============================================
DESCRIBE contactos;

-- =============================================
-- VER ESTRUCTURA DE projects
-- =============================================
DESCRIBE projects;

-- =============================================
-- INSERTAR DATOS DE PRUEBA (OPCIONAL)
-- =============================================
-- Descomenta estas líneas si quieres probar con datos de ejemplo

-- INSERT INTO contactos (nombre, email, mensaje) VALUES
-- ('Juan Pérez', 'juan@example.com', 'Hola, me interesa trabajar contigo.'),
-- ('María García', 'maria@example.com', 'Tu portafolio se ve increíble!');

-- =============================================
-- CONSULTAS ÚTILES
-- =============================================

-- Ver todos los contactos recibidos
-- SELECT * FROM contactos ORDER BY fecha_creacion DESC;

-- Ver contactos de hoy
-- SELECT * FROM contactos WHERE DATE(fecha_creacion) = CURDATE();

-- Contar total de mensajes
-- SELECT COUNT(*) as total_mensajes FROM contactos;

-- Buscar por email
-- SELECT * FROM contactos WHERE email LIKE '%ejemplo.com%';
