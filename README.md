# API REST - Portafolio Web

API backend para la gestión de proyectos del portafolio web desarrollado con Express.js y almacenamiento en JSON.

## 🚀 Características

- ✅ CRUD completo de proyectos
- ✅ Gestión de múltiples imágenes por proyecto (hasta 5 por proyecto)
- ✅ Filtrado por categorías (frontend, uxui, framework)
- ✅ Almacenamiento en archivo JSON (sin base de datos)
- ✅ Cada imagen con título y descripción propios
- ✅ Validaciones de datos
- ✅ CORS configurado
- ✅ Fácil de editar manualmente

## 📋 Requisitos previos

- Node.js 18+
- pnpm (recomendado) o npm

## 🔧 Instalación

1. **Instalar dependencias**
```bash
cd Portafolio-API
pnpm install
```

## 🏃‍♂️ Ejecutar el proyecto

**Modo desarrollo (con nodemon):**
```bash
pnpm run dev
```

**Modo producción:**
```bash
pnpm start
```

El servidor estará disponible en `http://localhost:4000`

## 📡 Endpoints de la API

### Proyectos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/projects` | Obtener todos los proyectos |
| GET | `/api/projects?categoria=frontend` | Filtrar por categoría |
| GET | `/api/projects/:id` | Obtener un proyecto específico |
| POST | `/api/projects` | Crear nuevo proyecto |
| PUT | `/api/projects/:id` | Actualizar proyecto |
| DELETE | `/api/projects/:id` | Eliminar proyecto |

## 📝 Estructura de datos

### Proyecto completo

```json
{
  "id": 1,
  "titulo": "Proyecto de Ejemplo",
  "descripcion": "Descripción detallada del proyecto",
  "categoria": "frontend",
  "tecnologias": ["React", "Tailwind CSS", "Vite"],
  "github_url": "https://github.com/usuario/proyecto",
  "demo_url": "https://proyecto.netlify.app",
  "orden": 1,
  "images": [
    {
      "id": 1,
      "url": "/images/projects/ejemplo/main.webp",
      "titulo": "Vista principal",
      "descripcion": "Página de inicio con diseño responsive",
      "is_main": true,
      "orden": 1
    },
    {
      "id": 2,
      "url": "/images/projects/ejemplo/detalle.webp",
      "titulo": "Vista de detalle",
      "descripcion": "Sección de detalles del producto",
      "is_main": false,
      "orden": 2
    }
  ]
}
```

## 📝 Ejemplos de uso

### Obtener todos los proyectos
```javascript
fetch('http://localhost:4000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Crear un proyecto
```javascript
fetch('http://localhost:4000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Mi Proyecto',
    descripcion: 'Descripción del proyecto',
    categoria: 'frontend',
    tecnologias: ['React', 'Tailwind CSS'],
    github_url: 'https://github.com/usuario/proyecto',
    demo_url: 'https://proyecto.com',
    images: [
      {
        id: 1,
        url: '/images/projects/mi-proyecto/main.webp',
        titulo: 'Vista principal',
        descripcion: 'Captura de la página principal',
        is_main: true,
        orden: 1
      },
      {
        id: 2,
        url: '/images/projects/mi-proyecto/mobile.webp',
        titulo: 'Versión móvil',
        descripcion: 'Diseño responsive en móvil',
        is_main: false,
        orden: 2
      }
    ]
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Actualizar un proyecto
```javascript
fetch('http://localhost:4000/api/projects/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Nuevo título',
    descripcion: 'Nueva descripción'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Eliminar un proyecto
```javascript
fetch('http://localhost:4000/api/projects/1', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

### Filtrar por categoría
```javascript
// Obtener solo proyectos de frontend
fetch('http://localhost:4000/api/projects?categoria=frontend')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🗄️ Almacenamiento de datos

Los datos se guardan en `data/projects.json`. Puedes editar este archivo manualmente si necesitas hacer cambios rápidos.

**Estructura del archivo:**
```json
{
  "projects": [...],
  "nextId": 4
}
```

## 📂 Estructura del proyecto

```
Portafolio-API/
├── controllers/
│   └── ProjectController.js # Lógica de negocio (CRUD)
├── models/
│   └── Project.js           # Modelo de datos con JSON
├── routes/
│   └── projects.js          # Definición de rutas
├── data/
│   └── projects.json        # Almacenamiento de datos
├── .gitignore
├── index.js                 # Servidor principal
├── package.json
├── GUIA-USO.md             # Guía de integración con React
└── README.md
```

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **Node.js** - Runtime de JavaScript
- **File System (fs)** - Para lectura/escritura de JSON
- **cors** - Middleware CORS

## 🚢 Deployment

### Vercel (Recomendado para JSON API)

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configurar:
- La carpeta `data/` se mantendrá en cada deploy
- Las imágenes deben estar en tu frontend (Netlify)

### Render

1. Conecta tu repositorio GitHub
2. Configuración:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Deploy automático

## 📸 Gestión de imágenes

Las imágenes deben estar en tu proyecto frontend (React + Netlify):

```
joDani/public/images/projects/
├── proyecto1/
│   ├── main.webp
│   ├── detalle.webp
│   └── mobile.webp
├── proyecto2/
│   └── ...
```

En el JSON, las rutas son relativas al frontend:
```json
{
  "url": "/images/projects/proyecto1/main.webp"
}
```

## ⚠️ Notas importantes

- **Edición manual**: Puedes editar `data/projects.json` directamente
- **Imágenes**: Máximo 5 por proyecto (según tus requisitos)
- **Categorías válidas**: `frontend`, `uxui`, `framework`
- **IDs auto-incrementales**: Se generan automáticamente
- **Backup**: Haz backup de `data/projects.json` regularmente

## 📄 Licencia

ISC

## 👨‍💻 Autor

Daniel - [GitHub](https://github.com/MrDrogoa)

## 🚀 Características

- ✅ CRUD completo de proyectos
- ✅ Gestión de múltiples imágenes por proyecto
- ✅ Pasos de desarrollo personalizados
- ✅ Filtrado por categorías (frontend, uxui, framework)
- ✅ Soft delete para proyectos
- ✅ Validaciones de datos
- ✅ CORS configurado
- ✅ Variables de entorno

## 📋 Requisitos previos

- Node.js 18+
- MySQL 8.0+
- pnpm (recomendado) o npm

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/MrDrogoa/PortafolioWebReact.git
cd Portafolio-API
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de MySQL:
```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=portafolio_db

FRONTEND_URL=http://localhost:5173
```

4. **Crear la base de datos**

Ejecuta el script SQL en MySQL:
```bash
mysql -u root -p < database/schema.sql
```

5. **Insertar datos de ejemplo (opcional)**
```bash
mysql -u root -p < database/seed.sql
```

## 🏃‍♂️ Ejecutar el proyecto

**Modo desarrollo (con nodemon):**
```bash
pnpm run dev
```

**Modo producción:**
```bash
pnpm start
```

El servidor estará disponible en `http://localhost:4000`

## 📡 Endpoints de la API

### Proyectos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/projects` | Obtener todos los proyectos |
| GET | `/api/projects?categoria=frontend` | Filtrar por categoría |
| GET | `/api/projects/:id` | Obtener un proyecto específico |
| POST | `/api/projects` | Crear nuevo proyecto |
| PUT | `/api/projects/:id` | Actualizar proyecto |
| DELETE | `/api/projects/:id` | Eliminar proyecto (soft delete) |
| DELETE | `/api/projects/:id/hard` | Eliminar permanentemente |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servidor y base de datos |

## 📝 Ejemplos de uso

### Obtener todos los proyectos
```javascript
fetch('http://localhost:4000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Crear un proyecto
```javascript
fetch('http://localhost:4000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Mi Proyecto',
    descripcion: 'Descripción del proyecto',
    categoria: 'frontend',
    tecnologias: ['React', 'Tailwind CSS'],
    github_url: 'https://github.com/usuario/proyecto',
    demo_url: 'https://proyecto.com',
    images: [
      {
        image_url: '/images/proyecto1.webp',
        image_alt: 'Captura principal',
        is_main: true,
        orden: 1
      }
    ],
    steps: [
      {
        titulo: 'Diseño',
        descripcion: 'Creación de <span class="text-[#FF6F61] font-semibold">mockups</span>',
        orden: 1
      }
    ]
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Filtrar por categoría
```javascript
// Obtener solo proyectos de frontend
fetch('http://localhost:4000/api/projects?categoria=frontend')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🗄️ Estructura de la base de datos

### Tabla `projects`
- `id` - INT (PK, AUTO_INCREMENT)
- `titulo` - VARCHAR(255)
- `descripcion` - TEXT
- `categoria` - ENUM('frontend', 'uxui', 'framework')
- `tecnologias` - JSON
- `github_url` - VARCHAR(500)
- `demo_url` - VARCHAR(500)
- `orden` - INT
- `activo` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### Tabla `project_images`
- `id` - INT (PK, AUTO_INCREMENT)
- `project_id` - INT (FK)
- `image_url` - VARCHAR(500)
- `image_alt` - VARCHAR(255)
- `is_main` - BOOLEAN
- `orden` - INT

### Tabla `project_steps`
- `id` - INT (PK, AUTO_INCREMENT)
- `project_id` - INT (FK)
- `titulo` - VARCHAR(255)
- `descripcion` - TEXT
- `orden` - INT

## 🚢 Deployment en Railway/Render (Gratis)

### Railway

1. Crear cuenta en [Railway.app](https://railway.app)
2. Crear nuevo proyecto
3. Agregar servicio MySQL
4. Agregar servicio Node.js desde GitHub
5. Configurar variables de entorno desde Railway dashboard
6. Ejecutar schema.sql en la base de datos Railway

### Render

1. Crear cuenta en [Render.com](https://render.com)
2. Crear nuevo servicio Web
3. Conectar repositorio GitHub
4. Crear base de datos PostgreSQL/MySQL
5. Configurar variables de entorno
6. Deploy automático

## 🔐 Variables de entorno en producción

```env
PORT=4000
NODE_ENV=production

# Railway/Render te proporcionará estos valores
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=6543
DB_USER=root
DB_PASSWORD=password_generado_por_railway
DB_NAME=railway

# URL de tu frontend en Netlify
FRONTEND_URL=https://tu-portafolio.netlify.app
```

## 📂 Estructura del proyecto

```
Portafolio-API/
├── config/
│   └── database.js          # Configuración de MySQL
├── controllers/
│   └── ProjectController.js # Lógica de negocio
├── models/
│   └── Project.js           # Modelo de datos
├── routes/
│   └── projects.js          # Definición de rutas
├── database/
│   ├── schema.sql           # Estructura de tablas
│   └── seed.sql             # Datos de ejemplo
├── .env.example             # Plantilla de variables
├── .gitignore
├── index.js                 # Servidor principal
├── package.json
└── README.md
```

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **MySQL2** - Driver de MySQL con Promises
- **dotenv** - Manejo de variables de entorno
- **cors** - Middleware CORS
- **nodemon** - Auto-reload en desarrollo

## 📄 Licencia

ISC

## 👨‍💻 Autor

Daniel - [GitHub](https://github.com/MrDrogoa)
