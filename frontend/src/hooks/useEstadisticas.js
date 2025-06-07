import { useState, useEffect } from 'react';
import { autoresService } from '../servicios/autoresService';
import { librosService } from '../servicios/librosService';

export const useEstadisticas = () => {
  const [estadisticas, setEstadisticas] = useState({
    totalAutores: 0,
    totalLibros: 0,
    librosDisponibles: 0
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargarEstadisticas = async () => {
    setCargando(true);
    setError(null);
    
    try {
      // Cargar autores y libros
      const [respuestaAutores, respuestaLibros] = await Promise.all([
        autoresService.obtenerTodos(),
        librosService.obtenerTodos()
      ]);

      const autores = respuestaAutores.datos || [];
      const libros = respuestaLibros.datos || [];
      
      // Calcular estadísticas
      const librosDisponibles = libros.filter(libro => libro.estado === 'disponible').length;

      setEstadisticas({
        totalAutores: autores.length,
        totalLibros: libros.length,
        librosDisponibles: librosDisponibles
      });
    } catch (err) {
      setError(err.message);
      console.error('Error cargando estadísticas:', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  return {
    estadisticas,
    cargando,
    error,
    cargarEstadisticas
  };
};