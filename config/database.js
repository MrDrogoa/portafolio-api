const mysql = require("mysql2");

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // Servidor de MySQL
  user: process.env.DB_USER || "root", // Usuario de MySQL
  password: process.env.DB_PASSWORD || "root", // Contraseña de MySQL
  database: process.env.DB_NAME || "portafolio_db", // Nombre de la base de datos
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Usar promesas en lugar de callbacks
const promisePool = pool.promise();

// Probar la conexión
promisePool
  .query("SELECT 1")
  .then(() => {
    console.log("✅ Conexión a MySQL establecida correctamente");
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MySQL:", error.message);
  });

module.exports = promisePool;
