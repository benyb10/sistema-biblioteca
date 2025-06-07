const Libro = require('../modelos/Libro');
const LibroAutor = require('../modelos/LibroAutor');
const Autor = require('../modelos/Autor');

// Obtener todos los libros con sus autores
const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().sort({ titulo: 1 });
    
    // Obtener autores para cada libro
    const librosConAutores = await Promise.all(
      libros.map(async (libro) => {
        const relacionesAutores = await LibroAutor.find({ libroId: libro._id })
          .populate('autorId', 'nombre apellido')
          .exec();
        
        return {
          ...libro.toObject(),
          autores: relacionesAutores.map(rel => ({
            ...rel.autorId.toObject(),
            rolAutor: rel.rolAutor
          }))
        };
      })
    );

    res.json({
      exito: true,
      datos: librosConAutores,
      mensaje: 'Libros obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener libros',
      error: error.message
    });
  }
};

// Obtener un libro por ID
const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Libro no encontrado'
      });
    }

    // Obtener autores
    const relacionesAutores = await LibroAutor.find({ libroId: libro._id })
      .populate('autorId', 'nombre apellido nacionalidad')
      .exec();

    const libroConAutores = {
      ...libro.toObject(),
      autores: relacionesAutores.map(rel => ({
        ...rel.autorId.toObject(),
        rolAutor: rel.rolAutor
      }))
    };

    res.json({
      exito: true,
      datos: libroConAutores,
      mensaje: 'Libro encontrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener libro',
      error: error.message
    });
  }
};

// Crear un nuevo libro
const crearLibro = async (req, res) => {
  try {
    const { autores, ...datosLibro } = req.body;

    
    const nuevoLibro = new Libro(datosLibro);
    const libroGuardado = await nuevoLibro.save();

    //crear las relaciones
    if (autores && autores.length > 0) {
      const relacionesAutores = autores.map(autor => ({
        libroId: libroGuardado._id,
        autorId: autor.autorId,
        rolAutor: autor.rolAutor || 'principal'
      }));

      await LibroAutor.insertMany(relacionesAutores);
    }

    
    const libroCompleto = await obtenerLibroCompleto(libroGuardado._id);

    res.status(201).json({
      exito: true,
      datos: libroCompleto,
      mensaje: 'Libro creado exitosamente'
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
      mensaje: 'Error al crear libro',
      error: error.message
    });
  }
};

// Actualizar un libro
const actualizarLibro = async (req, res) => {
  try {
    const { autores, ...datosLibro } = req.body;

    console.log('Datos recibidos para actualización:', { autores, datosLibro }); // Debug

    
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id,
      datosLibro,
      { new: true, runValidators: true }
    );

    if (!libroActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Libro no encontrado'
      });
    }

    // actualizar las relaciones
    if (autores && Array.isArray(autores)) {
      
      await LibroAutor.deleteMany({ libroId: req.params.id });

      
      if (autores.length > 0) {
        const relacionesAutores = autores.map(autor => ({
          libroId: req.params.id,
          autorId: autor.autorId,
          rolAutor: autor.rolAutor || 'principal'
        }));

        await LibroAutor.insertMany(relacionesAutores);
      }
    }

    
    const libroCompleto = await obtenerLibroCompleto(req.params.id);

    res.json({
      exito: true,
      datos: libroCompleto,
      mensaje: 'Libro actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error en actualizarLibro:', error); // Debug
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        exito: false,
        mensaje: 'Error de validación',
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar libro',
      error: error.message
    });
  }
};

// Eliminar un libro
const eliminarLibro = async (req, res) => {
  try {
    // Eliminar relaciones con autores primero
    await LibroAutor.deleteMany({ libroId: req.params.id });

    // Eliminar el libro
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
    if (!libroEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Libro no encontrado'
      });
    }

    res.json({
      exito: true,
      mensaje: 'Libro eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar libro',
      error: error.message
    });
  }
};

// Buscar libros
const buscarLibros = async (req, res) => {
  try {
    const { busqueda, genero, estado } = req.query;
    let filtros = {};

    if (busqueda) {
      const regex = new RegExp(busqueda, 'i');
      filtros.$or = [
        { titulo: regex },
        { editorial: regex },
        { descripcion: regex }
      ];
    }

    if (genero) filtros.genero = genero;
    if (estado) filtros.estado = estado;

    const libros = await Libro.find(filtros).sort({ titulo: 1 });

    res.json({
      exito: true,
      datos: libros,
      mensaje: `Se encontraron ${libros.length} libros`
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al buscar libros',
      error: error.message
    });
  }
};

// Función auxiliar para obtener libro completo
const obtenerLibroCompleto = async (libroId) => {
  const libro = await Libro.findById(libroId);
  const relacionesAutores = await LibroAutor.find({ libroId })
    .populate('autorId', 'nombre apellido nacionalidad')
    .exec();

  return {
    ...libro.toObject(),
    autores: relacionesAutores.map(rel => ({
      ...rel.autorId.toObject(),
      rolAutor: rel.rolAutor
    }))
  };
};

module.exports = {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
  buscarLibros
};