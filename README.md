# Sistema de Gestión de Biblioteca

Sistema completo de gestión de biblioteca desarrollado con React (frontend) y Node.js/Express (backend), usando MongoDB como base de datos.

## Características

-  **CRUD completo de Autores** - Crear, leer, actualizar, eliminar
-  **CRUD completo de Libros** - Con relaciones a autores múltiples
-  **Gestión de relaciones** - Libros con múltiples autores y roles
-  **Búsquedas y filtros** - Por diferentes criterios
-  **Validaciones robustas** - Frontend y backend
-  **Diseño responsive** - Funciona en móviles y desktop
-  **API RESTful** - Backend bien estructurado

##  Tecnologías

**Frontend:**
- React 18
- React Router
- Axios
- Tailwind CSS
- Lucide React (iconos)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- Validaciones personalizadas

##  Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- Git

### Clonar el repositorio
```bash
git clone https://github.com/benyb10/sistema-biblioteca.git
cd sistema-biblioteca 
```

### Configurar Backend
```bash
cd backend
npm install
```
### Crear archivo .env en la carpeta backend:
```bash
envPORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sistema_biblioteca
NODE_ENV=development
```
### Iniciar backend:
```bash
npm run dev
```
### Configurar Frontend
```bash
cd ../frontend
npm install
npm start
```
### Uso

- Backend: Se ejecuta en http://localhost:5000
- Frontend: Se ejecuta en http://localhost:3000

### Endpoints de la API
Autores:
- GET /api/autores - Obtener todos los autores
- POST /api/autores - Crear nuevo autor
- PUT /api/autores/:id - Actualizar autor
- DELETE /api/autores/:id - Eliminar autor

Libros:
- GET /api/libros - Obtener todos los libros
- POST /api/libros - Crear nuevo libro
- PUT /api/libros/:id - Actualizar libro
- DELETE /api/libros/:id - Eliminar libro

### Desarrollador
Bryan Viteri
