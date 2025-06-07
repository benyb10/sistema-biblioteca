const express = require('express');
const router = express.Router();
const {
  obtenerAutores,
  obtenerAutorPorId,
  crearAutor,
  actualizarAutor,
  eliminarAutor,
  buscarAutores
} = require('../controlador/CAutor');

// Ruta para buscar autores (debe ir antes de /:id)
router.get('/buscar', buscarAutores);

// Ruta para obtener todos los autores
router.get('/', obtenerAutores);

// Ruta para obtener un autor por ID
router.get('/:id', obtenerAutorPorId);

// Ruta para crear un nuevo autor
router.post('/', crearAutor);

// Ruta para actualizar un autor
router.put('/:id', actualizarAutor);

// Ruta para eliminar un autor
router.delete('/:id', eliminarAutor);

module.exports = router;