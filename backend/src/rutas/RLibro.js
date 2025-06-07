const express = require('express');
const router = express.Router();
const {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
  buscarLibros
} = require('../controlador/CLibro');

// Ruta para buscar libros (debe ir antes de /:id)
router.get('/buscar', buscarLibros);

// Ruta para obtener todos los libros
router.get('/', obtenerLibros);

// Ruta para obtener un libro por ID
router.get('/:id', obtenerLibroPorId);

// Ruta para crear un nuevo libro
router.post('/', crearLibro);

// Ruta para actualizar un libro
router.put('/:id', actualizarLibro);

// Ruta para eliminar un libro
router.delete('/:id', eliminarLibro);

module.exports = router;