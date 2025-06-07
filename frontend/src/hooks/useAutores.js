import { useState, useEffect } from 'react';
import { autoresService } from '../servicios/autoresService';

export const useAutores = () => {
  const [autores, setAutores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargarAutores = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await autoresService.obtenerTodos();
      setAutores(respuesta.datos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const crearAutor = async (datosAutor) => {
    try {
      const respuesta = await autoresService.crear(datosAutor);
      setAutores(prevAutores => [...prevAutores, respuesta.datos]);
      return respuesta;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const actualizarAutor = async (id, datosAutor) => {
    try {
      const respuesta = await autoresService.actualizar(id, datosAutor);
      setAutores(prevAutores => 
        prevAutores.map(autor => 
          autor._id === id ? respuesta.datos : autor
        )
      );
      return respuesta;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarAutor = async (id) => {
    try {
      await autoresService.eliminar(id);
      setAutores(prevAutores => 
        prevAutores.filter(autor => autor._id !== id)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  return {
    autores,
    cargando,
    error,
    cargarAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor,
    setError  
  };
};