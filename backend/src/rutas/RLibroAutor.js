const express = require('express');
const router = express.Router();
const {
  obtenerRelacionesLibroAutor,
  obtenerAutoresDeLibro,
  obtenerLibrosDeAutor,
  crearRelacionLibroAutor,
  eliminarRelacionLibroAutor,
  actualizarRolAutor
} = require('../controlador/CLibroAutor');

// Ruta para obtener todas las relaciones libro-autor
router.get('/', obtenerRelacionesLibroAutor);

// Ruta para obtener autores de un libro específico
router.get('/libro/:libroId/autores', obtenerAutoresDeLibro);

// Ruta para obtener libros de un autor específico
router.get('/autor/:autorId/libros', obtenerLibrosDeAutor);

// Ruta para crear una nueva relación libro-autor
router.post('/', crearRelacionLibroAutor);

// Ruta para actualizar el rol de un autor en un libro
router.put('/:id', actualizarRolAutor);

// Ruta para eliminar una relación libro-autor
router.delete('/:id', eliminarRelacionLibroAutor);

module.exports = router;