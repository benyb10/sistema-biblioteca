import React, { useState } from 'react';
import { useLibros } from '../hooks/useLibros';
import EncabezadoPrincipal from '../componentes/layout/EncabezadoPrincipal';
import ListaLibros from '../componentes/libros/ListaLibros';
import FormularioLibro from '../componentes/libros/FormularioLibro';
import { librosService } from '../servicios/librosService';
import { Link } from 'react-router-dom';

const LibrosPage = () => {
  const {
    libros,
    cargando,
    error,
    actualizarLibro,
    eliminarLibro,
    setError
  } = useLibros();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [cargandoFormulario, setCargandoFormulario] = useState(false);
  const [librosFiltrados, setLibrosFiltrados] = useState(libros);
  const [mensajeExito, setMensajeExito] = useState('');

  // Actualizar cuando cambien los libros
  React.useEffect(() => {
    setLibrosFiltrados(libros);
  }, [libros]);

  const manejarEditar = (libro) => {
    setLibroEditando(libro);
    setMostrarFormulario(true);
    setError(null);
  };

  const manejarGuardar = async (datosLibro) => {
    setCargandoFormulario(true);
    try {
      await actualizarLibro(libroEditando._id, datosLibro);
      setMensajeExito('Libro actualizado exitosamente');
      setMostrarFormulario(false);
      setLibroEditando(null);
      
      // Limpia después de 3 segundos
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al actualizar libro:', error);
    } finally {
      setCargandoFormulario(false);
    }
  };

  const manejarCancelar = () => {
    setMostrarFormulario(false);
    setLibroEditando(null);
    setError(null);
  };

  const manejarEliminar = async (libroId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      try {
        await eliminarLibro(libroId);
        setMensajeExito('Libro eliminado exitosamente');
        setTimeout(() => setMensajeExito(''), 3000);
      } catch (error) {
        console.error('Error al eliminar libro:', error);
      }
    }
  };

  const manejarBuscar = async (filtros) => {
    if (!filtros.busqueda && !filtros.genero && !filtros.estado) {
      setLibrosFiltrados(libros);
      return;
    }

    try {
      const parametros = {};
      if (filtros.busqueda) parametros.busqueda = filtros.busqueda;
      if (filtros.genero) parametros.genero = filtros.genero;
      if (filtros.estado) parametros.estado = filtros.estado;

      const respuesta = await librosService.buscar(parametros);
      setLibrosFiltrados(respuesta.datos || []);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      setError('Error al buscar libros');
    }
  };

  return (
    <div>
      <EncabezadoPrincipal
        titulo="Gestión de Libros"
        subtitulo="Administra todo el catálogo de libros de tu biblioteca"
        accion={
          !mostrarFormulario && (
            <Link to="/crear-libro" className="btn-primario">
              Crear Nuevo Libro
            </Link>
          )
        }
      />

      {mensajeExito && (
        <div style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {mensajeExito}
        </div>
      )}

      {/* Formulario*/}
      {mostrarFormulario ? (
        <FormularioLibro
          libro={libroEditando}
          onGuardar={manejarGuardar}
          onCancelar={manejarCancelar}
          cargando={cargandoFormulario}
        />
      ) : (
        <ListaLibros
          libros={librosFiltrados}
          cargando={cargando}
          error={error}
          onEditar={manejarEditar}
          onEliminar={manejarEliminar}
          onBuscar={manejarBuscar}
        />
      )}
    </div>
  );
};

export default LibrosPage;