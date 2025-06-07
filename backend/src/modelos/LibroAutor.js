const mongoose = require('mongoose');

const esquemaLibroAutor = new mongoose.Schema({
  libroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro',
    required: [true, 'El ID del libro es obligatorio']
  },
  autorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'El ID del autor es obligatorio']
  },
  rolAutor: {
    type: String,
    default: 'principal',
    enum: {
      values: ['principal', 'coautor', 'editor', 'traductor', 'ilustrador', 'colaborador'],
      message: 'Rol de autor no válido'
    }
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: false }
});

// Índice compuesto para evitar duplicados
esquemaLibroAutor.index({ libroId: 1, autorId: 1, rolAutor: 1 }, { unique: true });

module.exports = mongoose.model('LibroAutor', esquemaLibroAutor);