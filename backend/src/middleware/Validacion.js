const { body, param, query, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Errores de validación',
      errores: errores.array()
    });
  }
  next();
};

// Validaciones para Autor
const validarCrearAutor = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .trim(),
  body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email no válido')
    .normalizeEmail(),
  body('fechaNacimiento')
    .optional()
    .isISO8601()
    .withMessage('Fecha de nacimiento debe ser una fecha válida'),
  body('nacionalidad')
    .optional()
    .isLength({ max: 50 })
    .withMessage('La nacionalidad no puede exceder 50 caracteres')
    .trim(),
  body('biografia')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La biografía no puede exceder 1000 caracteres')
    .trim(),
  body('sitioWeb')
    .optional()
    .isURL()
    .withMessage('Sitio web debe ser una URL válida'),
  manejarErroresValidacion
];

const validarActualizarAutor = [
  param('id').isMongoId().withMessage('ID de autor no válido'),
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .trim(),
  body('apellido')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email no válido')
    .normalizeEmail(),
  body('fechaNacimiento')
    .optional()
    .isISO8601()
    .withMessage('Fecha de nacimiento debe ser una fecha válida'),
  body('nacionalidad')
    .optional()
    .isLength({ max: 50 })
    .withMessage('La nacionalidad no puede exceder 50 caracteres')
    .trim(),
  body('biografia')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La biografía no puede exceder 1000 caracteres')
    .trim(),
  body('sitioWeb')
    .optional()
    .isURL()
    .withMessage('Sitio web debe ser una URL válida'),
  manejarErroresValidacion
];

// Validaciones para Libro
const validarCrearLibro = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 1, max: 200 })
    .withMessage('El título debe tener entre 1 y 200 caracteres')
    .trim(),
  body('isbn')
    .optional()
    .matches(/^(?:\d{9}[\dX]|\d{13})$/)
    .withMessage('ISBN no válido'),
  body('fechaPublicacion')
    .optional()
    .isISO8601()
    .withMessage('Fecha de publicación debe ser una fecha válida'),
  body('genero')
    .optional()
    .isIn(['ficcion', 'no-ficcion', 'misterio', 'romance', 'ciencia-ficcion', 'fantasia', 'biografia', 'historia', 'ciencia', 'tecnologia', 'arte', 'filosofia', 'religion', 'autoayuda', 'infantil', 'juvenil', 'academico', 'otro'])
    .withMessage('Género no válido'),
  body('numeroPaginas')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('El número de páginas debe ser entre 1 y 10000'),
  body('editorial')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La editorial no puede exceder 100 caracteres')
    .trim(),
  body('descripcion')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('La descripción no puede exceder 2000 caracteres')
    .trim(),
  body('idioma')
    .optional()
    .isIn(['español', 'ingles', 'frances', 'aleman', 'italiano', 'portugues', 'catalan', 'gallego', 'euskera', 'otro'])
    .withMessage('Idioma no válido'),
  body('estado')
    .optional()
    .isIn(['disponible', 'prestado', 'mantenimiento', 'perdido'])
    .withMessage('Estado no válido'),
  body('autores')
    .optional()
    .isArray()
    .withMessage('Autores debe ser un array'),
  body('autores.*.autorId')
    .optional()
    .isMongoId()
    .withMessage('ID de autor no válido'),
  body('autores.*.rolAutor')
    .optional()
    .isIn(['principal', 'coautor', 'editor', 'traductor', 'ilustrador', 'colaborador'])
    .withMessage('Rol de autor no válido'),
  manejarErroresValidacion
];

const validarActualizarLibro = [
  param('id').isMongoId().withMessage('ID de libro no válido'),
  ...validarCrearLibro.slice(0, -1), // Todas las validaciones excepto manejarErroresValidacion
  manejarErroresValidacion
];

// Validaciones para LibroAutor
const validarCrearLibroAutor = [
  body('libroId')
    .notEmpty()
    .withMessage('El ID del libro es obligatorio')
    .isMongoId()
    .withMessage('ID de libro no válido'),
  body('autorId')
    .notEmpty()
    .withMessage('El ID del autor es obligatorio')
    .isMongoId()
    .withMessage('ID de autor no válido'),
  body('rolAutor')
    .optional()
    .isIn(['principal', 'coautor', 'editor', 'traductor', 'ilustrador', 'colaborador'])
    .withMessage('Rol de autor no válido'),
  manejarErroresValidacion
];

// Validaciones para parámetros
const validarId = [
  param('id').isMongoId().withMessage('ID no válido'),
  manejarErroresValidacion
];

const validarLibroId = [
  param('libroId').isMongoId().withMessage('ID de libro no válido'),
  manejarErroresValidacion
];

const validarAutorId = [
  param('autorId').isMongoId().withMessage('ID de autor no válido'),
  manejarErroresValidacion
];

// Validaciones para búsquedas
const validarBusqueda = [
  query('busqueda')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('La búsqueda debe tener entre 1 y 100 caracteres')
    .trim(),
  query('genero')
    .optional()
    .isIn(['ficcion', 'no-ficcion', 'misterio', 'romance', 'ciencia-ficcion', 'fantasia', 'biografia', 'historia', 'ciencia', 'tecnologia', 'arte', 'filosofia', 'religion', 'autoayuda', 'infantil', 'juvenil', 'academico', 'otro'])
    .withMessage('Género no válido'),
  query('estado')
    .optional()
    .isIn(['disponible', 'prestado', 'mantenimiento', 'perdido'])
    .withMessage('Estado no válido'),
  manejarErroresValidacion
];

module.exports = {
  validarCrearAutor,
  validarActualizarAutor,
  validarCrearLibro,
  validarActualizarLibro,
  validarCrearLibroAutor,
  validarId,
  validarLibroId,
  validarAutorId,
  validarBusqueda,
  manejarErroresValidacion
};