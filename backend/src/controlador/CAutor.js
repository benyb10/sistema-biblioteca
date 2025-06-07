const Autor = require('../modelos/Autor');

// Obtener todos los autores
const obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.find().sort({ nombre: 1 });
    res.json({
      exito: true,
      datos: autores,
      mensaje: 'Autores obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener autores',
      error: error.message
    });
  }
};

// Obtener un autor por ID
const obtenerAutorPorId = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    if (!autor) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Autor no encontrado'
      });
    }
    res.json({
      exito: true,
      datos: autor,
      mensaje: 'Autor encontrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener autor',
      error: error.message
    });
  }
};

// Crear un nuevo autor
const crearAutor = async (req, res) => {
  try {
    const nuevoAutor = new Autor(req.body);
    const autorGuardado = await nuevoAutor.save();
    res.status(201).json({
      exito: true,
      datos: autorGuardado,
      mensaje: 'Autor creado exitosamente'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        exito: false,
        mensaje: 'Error de validación',
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error al crear autor',
      error: error.message
    });
  }
};

// Actualizar un autor
const actualizarAutor = async (req, res) => {
  try {
    const autorActualizado = await Autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!autorActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Autor no encontrado'
      });
    }
    res.json({
      exito: true,
      datos: autorActualizado,
      mensaje: 'Autor actualizado exitosamente'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        exito: false,
        mensaje: 'Error de validación',
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar autor',
      error: error.message
    });
  }
};

// Eliminar un autor
const eliminarAutor = async (req, res) => {
  try {
    const autorEliminado = await Autor.findByIdAndDelete(req.params.id);
    if (!autorEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Autor no encontrado'
      });
    }
    res.json({
      exito: true,
      mensaje: 'Autor eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar autor',
      error: error.message
    });
  }
};

// Buscar autores por nombre
const buscarAutores = async (req, res) => {
  try {
    const { busqueda } = req.query;
    const regex = new RegExp(busqueda, 'i');
    const autores = await Autor.find({
      $or: [
        { nombre: regex },
        { apellido: regex }
      ]
    }).sort({ nombre: 1 });
    
    res.json({
      exito: true,
      datos: autores,
      mensaje: `Se encontraron ${autores.length} autores`
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al buscar autores',
      error: error.message
    });
  }
};

module.exports = {
  obtenerAutores,
  obtenerAutorPorId,
  crearAutor,
  actualizarAutor,
  eliminarAutor,
  buscarAutores
};