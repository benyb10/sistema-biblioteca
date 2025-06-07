import { useState, useEffect } from 'react';
import { librosService } from '../servicios/librosService';

export const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargarLibros = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await librosService.obtenerTodos();
      setLibros(respuesta.datos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const crearLibro = async (datosLibro) => {
    try {
      const respuesta = await librosService.crear(datosLibro);
      setLibros(prevLibros => [...prevLibros, respuesta.datos]);
      return respuesta;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const actualizarLibro = async (id, datosLibro) => {
    try {
      const respuesta = await librosService.actualizar(id, datosLibro);
      setLibros(prevLibros => 
        prevLibros.map(libro => 
          libro._id === id ? respuesta.datos : libro
        )
      );
      return respuesta;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarLibro = async (id) => {
    try {
      await librosService.eliminar(id);
      setLibros(prevLibros => 
        prevLibros.filter(libro => libro._id !== id)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  return {
    libros,
    cargando,
    error,
    cargarLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    setError  
  };
};