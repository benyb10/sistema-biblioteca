const mongoose = require('mongoose');

const esquemaAutor = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  fechaNacimiento: {
    type: Date
  },
  nacionalidad: {
    type: String,
    trim: true,
    maxlength: [50, 'La nacionalidad no puede exceder 50 caracteres']
  },
  biografia: {
    type: String,
    trim: true,
    maxlength: [1000, 'La biografía no puede exceder 1000 caracteres']
  },
  sitioWeb: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Debe ser una URL válida'
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Email no válido'
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
esquemaAutor.index({ nombre: 1, apellido: 1 });


esquemaAutor.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Configurar JSON output
esquemaAutor.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Autor', esquemaAutor);