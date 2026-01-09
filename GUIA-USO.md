# 📘 Guía de Uso - Cómo agregar proyectos y conectar con React

Esta guía te explica paso a paso cómo agregar tus proyectos a la API JSON y consumirla desde tu aplicación React.

---

## 📋 Tabla de Contenidos
1. [Preparar la API](#1-preparar-la-api)
2. [Agregar tus Proyectos](#2-agregar-tus-proyectos)
3. [Conectar con React](#3-conectar-con-react)
4. [Ejemplos de Uso](#4-ejemplos-de-uso)

---

## 1. Preparar la API

### Paso 1.1: Instalar dependencias

```bash
cd Portafolio-API
pnpm install
```

### Paso 1.2: Iniciar el servidor

```bash
pnpm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:4000
📝 Documentación: http://localhost:4000/
💾 Datos almacenados en: data/projects.json
```

### Paso 1.3: Verificar que funciona

Abre en el navegador: `http://localhost:4000/api/projects`

Verás los 3 proyectos de ejemplo en formato JSON.

---

## 2. Agregar tus Proyectos

Tienes **3 opciones** para agregar proyectos:

### ✅ OPCIÓN 1: Editar el archivo JSON directamente (RÁPIDO)

1. Abre `Portafolio-API/data/projects.json`
2. Edita el array `projects` con tus datos
3. Guarda el archivo
4. La API lee los cambios automáticamente

**Formato de cada proyecto:**

```json
{
  "id": 1,
  "titulo": "Tu Proyecto",
  "descripcion": "Descripción completa de tu proyecto...",
  "categoria": "frontend",
  "tecnologias": ["React", "Tailwind CSS"],
  "github_url": "https://github.com/tu-usuario/proyecto",
  "demo_url": "https://proyecto.netlify.app",
  "orden": 1,
  "images": [
    {
      "id": 1,
      "url": "/images/projects/tu-proyecto/imagen1.webp",
      "titulo": "Título de la imagen",
      "descripcion": "Descripción de qué muestra esta imagen",
      "is_main": true,
      "orden": 1
    },
    {
      "id": 2,
      "url": "/images/projects/tu-proyecto/imagen2.webp",
      "titulo": "Vista de detalle",
      "descripcion": "Muestra la sección de productos",
      "is_main": false,
      "orden": 2
    }
  ]
}
```

**⚠️ Importante:**
- Cada proyecto debe tener un `id` único
- Actualiza `nextId` al final del archivo (debe ser el siguiente número después del último ID)
- `categoria` solo puede ser: `"frontend"`, `"uxui"` o `"framework"`
- `is_main: true` solo en UNA imagen por proyecto (la principal)

---

### ✅ OPCIÓN 2: Usando Thunder Client (VS Code)

#### Paso 2.1: Instalar Thunder Client
- En VS Code, ve a Extensions
- Busca "Thunder Client"  
- Instala la extensión

#### Paso 2.2: Crear proyecto con POST

1. Abre Thunder Client
2. Nueva petición POST
3. URL: `http://localhost:4000/api/projects`
4. Headers: `Content-Type: application/json`
5. Body (JSON):

```json
{
  "titulo": "E-commerce de Ropa",
  "descripcion": "Tienda online con carrito de compras y pasarela de pago",
  "categoria": "frontend",
  "tecnologias": ["React", "Tailwind CSS", "Stripe"],
  "github_url": "https://github.com/tu-usuario/ecommerce",
  "demo_url": "https://ecommerce.netlify.app",
  "orden": 1,
  "images": [
    {
      "id": 1,
      "url": "/images/projects/ecommerce/home.webp",
      "titulo": "Página principal",
      "descripcion": "Vista de la tienda con productos destacados",
      "is_main": true,
      "orden": 1
    },
    {
      "id": 2,
      "url": "/images/projects/ecommerce/carrito.webp",
      "titulo": "Carrito de compras",
      "descripcion": "Gestión de productos en el carrito",
      "is_main": false,
      "orden": 2
    },
    {
      "id": 3,
      "url": "/images/projects/ecommerce/checkout.webp",
      "titulo": "Proceso de pago",
      "descripcion": "Integración con Stripe para pagos",
      "is_main": false,
      "orden": 3
    },
    {
      "id": 4,
      "url": "/images/projects/ecommerce/mobile.webp",
      "titulo": "Versión móvil",
      "descripcion": "Diseño responsive optimizado",
      "is_main": false,
      "orden": 4
    },
    {
      "id": 5,
      "url": "/images/projects/ecommerce/admin.webp",
      "titulo": "Panel de administración",
      "descripcion": "Dashboard para gestionar productos",
      "is_main": false,
      "orden": 5
    }
  ]
}
```

6. Send → el proyecto se crea automáticamente

---

### ✅ OPCIÓN 3: Desde tu código JavaScript

```javascript
async function agregarProyecto() {
  const proyecto = {
    titulo: "Mi Proyecto",
    descripcion: "Descripción...",
    categoria: "frontend",
    tecnologias: ["React", "Tailwind"],
    github_url: "https://github.com/...",
    demo_url: "https://...",
    images: [
      {
        id: 1,
        url: "/images/projects/mi-proyecto/main.webp",
        titulo: "Vista principal",
        descripcion: "Página de inicio",
        is_main: true,
        orden: 1
      }
    ]
  };

  const response = await fetch('http://localhost:4000/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proyecto)
  });

  const data = await response.json();
  console.log(data);
}
```

---

## 3. Conectar con React

### Paso 3.1: Crear servicio de API en React

Crea `joDani/src/services/projectsService.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ProjectsService {
  async getAllProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return [];
    }
  }

  async getProjectsByCategory(categoria) {
    try {
      const response = await fetch(`${API_URL}/projects?categoria=${categoria}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async getProjectById(id) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}

export default new ProjectsService();
```

### Paso 3.2: Configurar variable de entorno

Crea `joDani/.env.local`:

```env
# Desarrollo
VITE_API_URL=http://localhost:4000/api

# Producción (cuando subas a Vercel/Render)
# VITE_API_URL=https://tu-api.vercel.app/api
```

### Paso 3.3: Organizar imágenes en React

Coloca tus imágenes en:
```
joDani/public/images/projects/
├── proyecto1/
│   ├── main.webp
│   ├── detalle.webp
│   ├── mobile.webp
│   ├── admin.webp
│   └── checkout.webp
├── proyecto2/
│   └── ...
```

---

## 4. Ejemplos de Uso en React

### Ejemplo 1: Listar todos los proyectos

```jsx
import { useState, useEffect } from 'react';
import projectsService from '@/services/projectsService';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await projectsService.getAllProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h2>{project.titulo}</h2>
          <p>{project.descripcion}</p>
          
          {/* Imagen principal */}
          {project.images.find(img => img.is_main) && (
            <img 
              src={project.images.find(img => img.is_main).url}
              alt={project.images.find(img => img.is_main).titulo}
            />
          )}
          
          {/* Tecnologías */}
          <div>
            {project.tecnologias.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo 2: Proyectos por categoría con galería

```jsx
import { useState, useEffect } from 'react';
import projectsService from '@/services/projectsService';

function ProjectFrontend() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await projectsService.getProjectsByCategory('frontend');
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <div key={project.id} className="bg-[#202023] rounded-lg p-6">
          <h3 className="text-xl font-bold text-[#FF6F61] mb-2">
            {project.titulo}
          </h3>
          
          <p className="text-gray-300 mb-4">{project.descripcion}</p>
          
          {/* Galería de imágenes */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {project.images.map(img => (
              <div key={img.id} className="relative group">
                <img 
                  src={img.url}
                  alt={img.titulo}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition rounded flex items-center justify-center">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100">
                    {img.titulo}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enlaces */}
          <div className="flex gap-4">
            {project.github_url && (
              <a href={project.github_url} className="text-[#4ECDC4]">
                GitHub
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} className="text-[#FFEA00]">
                Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 Checklist de Implementación

- [ ] API instalada y corriendo (`pnpm run dev`)
- [ ] Archivo `data/projects.json` editado con tus 9 proyectos
- [ ] Imágenes colocadas en `joDani/public/images/projects/`
- [ ] Servicio creado en React (`projectsService.js`)
- [ ] Variable de entorno configurada (`.env.local`)
- [ ] Componentes actualizados para consumir la API
- [ ] Probado en desarrollo local

---

## 🚀 Deployment

### Backend (Vercel - Recomendado)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. En la carpeta `Portafolio-API`:
```bash
vercel
```

3. Configuración:
- El archivo `data/projects.json` se mantendrá
- Copia la URL que te da Vercel

### Frontend (Netlify)

1. En Netlify dashboard → Site settings → Environment variables
2. Agrega:
   - `VITE_API_URL` = `https://tu-api.vercel.app/api`
3. Redeploy tu sitio

---

## ❓ Preguntas Frecuentes

**Q: ¿Dónde pongo las imágenes de mis proyectos?**  
A: En `joDani/public/images/projects/` y referencialas como `/images/projects/nombre.webp`

**Q: ¿Cómo edito un proyecto después de crearlo?**  
A: Edita directamente `data/projects.json` o usa Thunder Client con método PUT

**Q: ¿Cuántas imágenes puedo tener por proyecto?**  
A: Hasta 5 imágenes por proyecto (según tus requisitos)

**Q: ¿Qué hago si pierdo los datos del JSON?**  
A: Haz backup regular de `data/projects.json`

**Q: ¿Puedo usar esta API sin React?**  
A: Sí, es una API REST estándar que funciona con cualquier framework

---

¿Necesitas ayuda? Revisa el README principal o los ejemplos en el código. 🎯


### Paso 1.1: Instalar MySQL (si no lo tienes)
- **Windows**: Descarga [MySQL Installer](https://dev.mysql.com/downloads/installer/)
- Durante la instalación, anota tu contraseña de root

### Paso 1.2: Crear las tablas
Abre tu terminal y ejecuta:

```bash
cd c:/Users/danie/Desktop/PortafolioWeb/Portafolio-API
mysql -u root -p < database/schema.sql
```

Si prefieres usar **MySQL Workbench**:
1. Abre MySQL Workbench
2. Conecta a tu servidor local
3. Abre el archivo `database/schema.sql`
4. Ejecuta el script (botón de rayo ⚡)

### Paso 1.3: Configurar variables de entorno
Edita el archivo `.env` en `Portafolio-API/.env`:

```env
DB_PASSWORD=tu_contraseña_de_mysql_aqui
```

### Paso 1.4: Verificar que todo funciona
```bash
cd Portafolio-API
pnpm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:4000
✅ Conexión a MySQL exitosa
```

---

## 2. Subir tus Proyectos

Tienes **3 opciones** para agregar tus proyectos:

### ✅ OPCIÓN 1: Usando Postman / Thunder Client (RECOMENDADO)

#### Paso 2.1: Instalar Thunder Client
- En VS Code, ve a Extensions
- Busca "Thunder Client"
- Instala la extensión

#### Paso 2.2: Crear una petición POST
1. Abre Thunder Client (icono del rayo en la barra lateral)
2. Click en "New Request"
3. Configura:
   - **Método**: POST
   - **URL**: `http://localhost:4000/api/projects`
   - **Headers**: Agrega `Content-Type: application/json`
   - **Body**: Selecciona "JSON" y pega este formato:

```json
{
  "titulo": "E-commerce de Ropa",
  "descripcion": "Tienda online desarrollada con React y Tailwind CSS, incluye carrito de compras, filtros de productos y pasarela de pago.",
  "categoria": "frontend",
  "tecnologias": ["React", "Tailwind CSS", "Stripe", "Context API"],
  "github_url": "https://github.com/tu-usuario/ecommerce",
  "demo_url": "https://mi-ecommerce.netlify.app",
  "orden": 1,
  "images": [
    {
      "image_url": "/images/projects/ecommerce-main.webp",
      "image_alt": "Página principal del e-commerce",
      "is_main": true,
      "orden": 1
    },
    {
      "image_url": "/images/projects/ecommerce-cart.webp",
      "image_alt": "Carrito de compras",
      "is_main": false,
      "orden": 2
    }
  ],
  "steps": [
    {
      "titulo": "Investigación",
      "descripcion": "Análisis de <span class=\"text-[#FF6F61] font-semibold\">competencia</span> y definición de <span class=\"text-[#FF6F61] font-semibold\">requisitos</span>",
      "orden": 1
    },
    {
      "titulo": "Diseño UI/UX",
      "descripcion": "Creación de <span class=\"text-[#FF6F61] font-semibold\">wireframes</span> y <span class=\"text-[#FF6F61] font-semibold\">prototipos</span>",
      "orden": 2
    },
    {
      "titulo": "Desarrollo",
      "descripcion": "Implementación con <span class=\"text-[#FF6F61] font-semibold\">React</span> y <span class=\"text-[#FF6F61] font-semibold\">Tailwind</span>",
      "orden": 3
    },
    {
      "titulo": "Deploy",
      "descripcion": "Despliegue en <span class=\"text-[#FF6F61] font-semibold\">Netlify</span> con CI/CD",
      "orden": 4
    }
  ]
}
```

4. Click en "Send"
5. Repite para cada uno de tus 9 proyectos

---

### ✅ OPCIÓN 2: Crear un archivo SQL personalizado

Crea un archivo `database/mis-proyectos.sql` con este formato:

```sql
USE portafolio_db;

-- Proyecto 1: Frontend
INSERT INTO projects (titulo, descripcion, categoria, tecnologias, github_url, demo_url, orden) 
VALUES (
    'Tu Proyecto Frontend 1',
    'Descripción detallada de tu proyecto...',
    'frontend',
    '["React", "Tailwind CSS", "Vite"]',
    'https://github.com/tu-usuario/proyecto1',
    'https://proyecto1.netlify.app',
    1
);

SET @project1_id = LAST_INSERT_ID();

INSERT INTO project_images (project_id, image_url, image_alt, is_main, orden) VALUES
(@project1_id, '/images/projects/proyecto1-main.webp', 'Pantalla principal', TRUE, 1),
(@project1_id, '/images/projects/proyecto1-detalle.webp', 'Vista detalle', FALSE, 2);

INSERT INTO project_steps (project_id, titulo, descripcion, orden) VALUES
(@project1_id, 'Paso 1', 'Descripción con <span class="text-[#FF6F61] font-semibold">palabras destacadas</span>', 1),
(@project1_id, 'Paso 2', 'Otra descripción...', 2);

-- Repite para tus otros 8 proyectos...
```

Luego ejecuta:
```bash
mysql -u root -p < database/mis-proyectos.sql
```

---

### ✅ OPCIÓN 3: Insertar directamente en MySQL Workbench

1. Abre MySQL Workbench
2. Conecta a tu base de datos
3. Ejecuta este query para cada proyecto:

```sql
USE portafolio_db;

INSERT INTO projects (titulo, descripcion, categoria, tecnologias, github_url, demo_url, orden) 
VALUES (
    'Nombre de tu proyecto',
    'Descripción completa...',
    'frontend',  -- o 'uxui' o 'framework'
    '["Tech1", "Tech2", "Tech3"]',
    'https://github.com/...',
    'https://demo.com',
    1
);
```

---

## 3. Conectar con React

### Paso 3.1: Crear servicio de API en React

Crea el archivo `joDani/src/services/projectsService.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ProjectsService {
  // Obtener todos los proyectos
  async getAllProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      return data.data; // Array de proyectos
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return [];
    }
  }

  // Obtener proyectos por categoría
  async getProjectsByCategory(categoria) {
    try {
      const response = await fetch(`${API_URL}/projects?categoria=${categoria}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error al obtener proyectos por categoría:', error);
      return [];
    }
  }

  // Obtener un proyecto específico
  async getProjectById(id) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error al obtener proyecto:', error);
      return null;
    }
  }
}

export default new ProjectsService();
```

### Paso 3.2: Configurar variable de entorno en React

Crea el archivo `joDani/.env.local`:

```env
# Desarrollo local
VITE_API_URL=http://localhost:4000/api

# Producción (cuando subas a Netlify, cambia a tu URL de Railway/Render)
# VITE_API_URL=https://tu-api.railway.app/api
```

### Paso 3.3: Usar en tus componentes

#### Ejemplo 1: Página de Proyectos Frontend

Edita `joDani/src/pages/ProjectFrontend.jsx`:

```jsx
import { useState, useEffect } from 'react';
import projectsService from '@/services/projectsService';
import ProjectsDeveloper from '@/components/main/projects/ProjectsDeveloper';

function ProjectFrontend() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await projectsService.getProjectsByCategory('frontend');
      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-[#FF6F61] text-xl">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#FF6F61] mb-8">
        Proyectos Frontend
      </h1>
      
      {projects.map((project) => (
        <div key={project.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{project.titulo}</h2>
          <p className="text-gray-300 mb-4">{project.descripcion}</p>
          
          {/* Tecnologías */}
          <div className="flex gap-2 mb-4">
            {project.tecnologias.map((tech, i) => (
              <span 
                key={i}
                className="bg-[#FF6F61] text-white px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Imágenes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.images.map((img) => (
              <img
                key={img.id}
                src={img.image_url}
                alt={img.image_alt}
                className="rounded-lg w-full"
              />
            ))}
          </div>

          {/* Pasos del proyecto */}
          {project.steps && project.steps.length > 0 && (
            <ProjectsDeveloper steps={project.steps} />
          )}

          {/* Enlaces */}
          <div className="flex gap-4 mt-6">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#202023] text-white px-6 py-2 rounded hover:bg-[#FF6F61] transition"
              >
                Ver en GitHub
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF6F61] text-white px-6 py-2 rounded hover:bg-[#FFEA00] transition"
              >
                Ver Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectFrontend;
```

#### Ejemplo 2: Página principal con todos los proyectos

Edita `joDani/src/pages/Projects.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectsService from '@/services/projectsService';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'frontend', 'uxui', 'framework'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      let data;
      
      if (filter === 'all') {
        data = await projectsService.getAllProjects();
      } else {
        data = await projectsService.getProjectsByCategory(filter);
      }
      
      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, [filter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded ${
            filter === 'all' 
              ? 'bg-[#FF6F61] text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('frontend')}
          className={`px-6 py-2 rounded ${
            filter === 'frontend' 
              ? 'bg-[#FF6F61] text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Frontend
        </button>
        <button
          onClick={() => setFilter('uxui')}
          className={`px-6 py-2 rounded ${
            filter === 'uxui' 
              ? 'bg-[#FF6F61] text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          UX/UI
        </button>
        <button
          onClick={() => setFilter('framework')}
          className={`px-6 py-2 rounded ${
            filter === 'framework' 
              ? 'bg-[#FF6F61] text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Framework
        </button>
      </div>

      {/* Grid de proyectos */}
      {loading ? (
        <p className="text-center text-[#FF6F61]">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#202023] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#FF6F61]/20 transition"
            >
              {/* Imagen principal */}
              {project.images.find(img => img.is_main) && (
                <img
                  src={project.images.find(img => img.is_main).image_url}
                  alt={project.titulo}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#FF6F61] mb-2">
                  {project.titulo}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.descripcion}
                </p>
                
                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tecnologias.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="text-[#4ECDC4] hover:text-[#FFEA00] transition"
                >
                  Ver detalles →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
```

### Paso 3.4: Actualizar componente ProjectsDeveloper

Modifica `joDani/src/components/main/projects/ProjectsDeveloper.jsx`:

```jsx
function ProjectsDeveloper({ steps }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#FFEA00] mb-4">
        Proceso de Desarrollo
      </h3>
      
      {steps.map((step, index) => (
        <div key={step.id} className="border-l-4 border-[#FF6F61] pl-6">
          <h4 className="text-lg font-semibold text-[#4ECDC4] mb-2">
            {index + 1}. {step.titulo}
          </h4>
          <p 
            className="text-gray-300"
            dangerouslySetInnerHTML={{ __html: step.descripcion }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectsDeveloper;
```

---

## 4. Ejemplos de Uso

### Obtener proyectos en cualquier componente:

```jsx
import { useState, useEffect } from 'react';
import projectsService from '@/services/projectsService';

function MiComponente() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await projectsService.getAllProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.titulo}</div>
      ))}
    </div>
  );
}
```

### Estructura de datos que recibirás:

```javascript
{
  id: 1,
  titulo: "E-commerce Dashboard",
  descripcion: "Panel de administración...",
  categoria: "frontend",
  tecnologias: ["React", "TypeScript", "Tailwind CSS"],
  github_url: "https://github.com/...",
  demo_url: "https://demo.com",
  orden: 1,
  activo: true,
  created_at: "2025-11-27T...",
  updated_at: "2025-11-27T...",
  images: [
    {
      id: 1,
      image_url: "/images/projects/main.webp",
      image_alt: "Pantalla principal",
      is_main: true,
      orden: 1
    }
  ],
  steps: [
    {
      id: 1,
      titulo: "Investigación",
      descripcion: "Análisis de <span class='text-[#FF6F61] font-semibold'>requisitos</span>",
      orden: 1
    }
  ]
}
```

---

## 📝 Checklist de Implementación

- [ ] MySQL instalado y funcionando
- [ ] Base de datos creada (ejecutar `schema.sql`)
- [ ] Archivo `.env` configurado con tu contraseña
- [ ] API corriendo (`pnpm run dev` en Portafolio-API)
- [ ] Tus 9 proyectos insertados en la base de datos
- [ ] Servicio creado en React (`src/services/projectsService.js`)
- [ ] Variable de entorno en React (`.env.local`)
- [ ] Componentes actualizados para consumir la API
- [ ] Imágenes de proyectos en `joDani/public/images/projects/`

---

## 🚀 Deployment

Cuando estés listo para subir a producción:

1. **Backend (Railway/Render)**:
   - Sube tu código a GitHub
   - Crea servicio en Railway/Render
   - Configura variables de entorno
   - Anota la URL de tu API

2. **Frontend (Netlify)**:
   - En Netlify, ve a "Site settings" → "Environment variables"
   - Agrega: `VITE_API_URL` con tu URL de Railway/Render
   - Redeploy tu sitio

---

## ❓ Preguntas Frecuentes

**Q: ¿Dónde pongo las imágenes de mis proyectos?**  
A: En `joDani/public/images/projects/` y referencialas como `/images/projects/nombre.webp`

**Q: ¿Cómo destaco palabras en los pasos?**  
A: Usa: `<span class="text-[#FF6F61] font-semibold">palabra</span>`

**Q: ¿Puedo tener proyectos sin imágenes?**  
A: Sí, el array `images` puede estar vacío

**Q: ¿Cómo edito un proyecto después?**  
A: Usa Thunder Client con método PUT a `/api/projects/:id`

---

¿Necesitas ayuda? Revisa el README principal o consulta la documentación de la API. 🎯
