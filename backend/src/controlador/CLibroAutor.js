const LibroAutor = require('../modelos/LibroAutor');
const Libro = require('../modelos/Libro');
const Autor = require('../modelos/Autor');


const obtenerRelacionesLibroAutor = async (req, res) => {
  try {
    const relaciones = await LibroAutor.find()
      .populate('libroId', 'titulo isbn')
      .populate('autorId', 'nombre apellido')
      .sort({ fechaCreacion: -1 });

    res.json({
      exito: true,
      datos: relaciones,
      mensaje: 'Relaciones obtenidas exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener relaciones',
      error: error.message
    });
  }
};


const obtenerAutoresDeLibro = async (req, res) => {
  try {
    const { libroId } = req.params;
    const relaciones = await LibroAutor.find({ libroId })
      .populate('autorId', 'nombre apellido nacionalidad biografia')
      .exec();

    res.json({
      exito: true,
      datos: relaciones,
      mensaje: 'Autores del libro obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener autores del libro',
      error: error.message
    });
  }
};


const obtenerLibrosDeAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const relaciones = await LibroAutor.find({ autorId })
      .populate('libroId', 'titulo isbn fechaPublicacion genero estado')
      .exec();

    res.json({
      exito: true,
      datos: relaciones,
      mensaje: 'Libros del autor obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener libros del autor',
      error: error.message
    });
  }
};


const crearRelacionLibroAutor = async (req, res) => {
  try {
    const { libroId, autorId, rolAutor } = req.body;


    const libro = await Libro.findById(libroId);
    const autor = await Autor.findById(autorId);

    if (!libro) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Libro no encontrado'
      });
    }

    if (!autor) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Autor no encontrado'
      });
    }

    const nuevaRelacion = new LibroAutor({
      libroId,
      autorId,
      rolAutor: rolAutor || 'principal'
    });

    const relacionGuardada = await nuevaRelacion.save();
    

    await relacionGuardada.populate('libroId', 'titulo');
    await relacionGuardada.populate('autorId', 'nombre apellido');

    res.status(201).json({
      exito: true,
      datos: relacionGuardada,
      mensaje: 'Relación libro-autor creada exitosamente'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Esta relación libro-autor ya existe'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        exito: false,
        mensaje: 'Error de validación',
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error al crear relación libro-autor',
      error: error.message
    });
  }
};


const eliminarRelacionLibroAutor = async (req, res) => {
  try {
    const relacionEliminada = await LibroAutor.findByIdAndDelete(req.params.id);
    
    if (!relacionEliminada) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Relación no encontrada'
      });
    }

    res.json({
      exito: true,
      mensaje: 'Relación libro-autor eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar relación',
      error: error.message
    });
  }
};

// Actualizar rol de autor en un libro
const actualizarRolAutor = async (req, res) => {
  try {
    const { rolAutor } = req.body;
    
    const relacionActualizada = await LibroAutor.findByIdAndUpdate(
      req.params.id,
      { rolAutor },
      { new: true, runValidators: true }
    )
    .populate('libroId', 'titulo')
    .populate('autorId', 'nombre apellido');

    if (!relacionActualizada) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Relación no encontrada'
      });
    }

    res.json({
      exito: true,
      datos: relacionActualizada,
      mensaje: 'Rol de autor actualizado exitosamente'
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
      mensaje: 'Error al actualizar rol de autor',
      error: error.message
    });
  }
};

module.exports = {
  obtenerRelacionesLibroAutor,
  obtenerAutoresDeLibro,
  obtenerLibrosDeAutor,
  crearRelacionLibroAutor,
  eliminarRelacionLibroAutor,
  actualizarRolAutor
};