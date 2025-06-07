const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rutas
const rutasAutores = require('./src/rutas/RAutor');
const rutasLibros = require('./src/rutas/RLibro');
const rutasLibroAutores = require('./src/rutas/RLibroAutor');

const app = express();


app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/autores', rutasAutores);
app.use('/api/libros', rutasLibros);
app.use('/api/libro-autores', rutasLibroAutores);


app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API Sistema Biblioteca funcionando correctamente',
    endpoints: {
      autores: '/api/autores',
      libros: '/api/libros',
      libroAutores: '/api/libro-autores'
    },
    timestamp: new Date().toISOString()
  });
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

const PUERTO = process.env.PORT || 5000;
const HOST = '0.0.0.0'; 

app.listen(PUERTO, HOST, () => {
  console.log(` Servidor corriendo en puerto ${PUERTO}`);
  console.log(` Accesible desde: http://localhost:${PUERTO}`);
  console.log(` Accesible desde red local: http://192.168.11.110:${PUERTO}`);
});