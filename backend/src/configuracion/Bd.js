const mongoose = require('mongoose');

const conectarBaseDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = conectarBaseDatos;