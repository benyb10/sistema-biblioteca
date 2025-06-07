const mongoose = require('mongoose');

const esquemaLibro = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^(?:\d{9}[\dX]|\d{13})$/.test(v.replace(/[-\s]/g, ''));
      },
      message: 'ISBN no válido'
    }
  },
  fechaPublicacion: {
    type: Date
  },
  genero: {
    type: String,
    trim: true,
    enum: {
      values: ['ficcion', 'no-ficcion', 'misterio', 'romance', 'ciencia-ficcion', 'fantasia', 'biografia', 'historia', 'ciencia', 'tecnologia', 'arte', 'filosofia', 'religion', 'autoayuda', 'infantil', 'juvenil', 'academico', 'otro'],
      message: 'Género no válido'
    }
  },
  numeroPaginas: {
    type: Number,
    min: [1, 'El número de páginas debe ser mayor a 0'],
    max: [10000, 'El número de páginas no puede exceder 10000']
  },
  editorial: {
    type: String,
    trim: true,
    maxlength: [100, 'La editorial no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [2000, 'La descripción no puede exceder 2000 caracteres']
  },
  idioma: {
    type: String,
    trim: true,
    default: 'español',
    enum: {
      values: ['español', 'ingles', 'frances', 'aleman', 'italiano', 'portugues', 'catalan', 'gallego', 'euskera', 'otro'],
      message: 'Idioma no válido'
    }
  },
  estado: {
    type: String,
    default: 'disponible',
    enum: {
      values: ['disponible', 'prestado', 'mantenimiento', 'perdido'],
      message: 'Estado no válido'
    }
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

//búsquedas rápidas
esquemaLibro.index({ titulo: 'text', genero: 1 });
esquemaLibro.index({ isbn: 1 });

module.exports = mongoose.model('Libro', esquemaLibro);