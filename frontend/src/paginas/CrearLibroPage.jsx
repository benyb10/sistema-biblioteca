import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibros } from '../hooks/useLibros';
import EncabezadoPrincipal from '../componentes/layout/EncabezadoPrincipal';
import FormularioLibro from '../componentes/libros/FormularioLibro';

const CrearLibroPage = () => {
  const navigate = useNavigate();
  const { crearLibro } = useLibros();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const manejarGuardar = async (datosLibro) => {
    setCargando(true);
    setError('');
    
    try {
      await crearLibro(datosLibro);
      
      // Redirigir
      alert('Libro creado exitosamente');
      navigate('/libros');
    } catch (error) {
      console.error('Error al crear libro:', error);
      setError('Error al crear el libro. Por favor, inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const manejarCancelar = () => {
    navigate('/libros');
  };

  return (
    <div>
      <EncabezadoPrincipal
        titulo="Crear Nuevo Libro"
        subtitulo="Agrega un nuevo libro con sus autores al catálogo de la biblioteca"
      />

      {error && (
        <div style={{
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <FormularioLibro
        libro={null}
        onGuardar={manejarGuardar}
        onCancelar={manejarCancelar}
        cargando={cargando}
      />
    </div>
  );
};

export default CrearLibroPage;