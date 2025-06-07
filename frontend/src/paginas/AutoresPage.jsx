import React, { useState } from 'react';
import { useAutores } from '../hooks/useAutores';
import EncabezadoPrincipal from '../componentes/layout/EncabezadoPrincipal';
import ListaAutores from '../componentes/autores/ListaAutores';
import FormularioAutor from '../componentes/autores/FormularioAutor';
import { autoresService } from '../servicios/autoresService';

const AutoresPage = () => {
  const {
    autores,
    cargando,
    error,
    crearAutor,
    actualizarAutor,
    eliminarAutor,
    setError
  } = useAutores();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [autorEditando, setAutorEditando] = useState(null);
  const [cargandoFormulario, setCargandoFormulario] = useState(false);
  const [autoresFiltrados, setAutoresFiltrados] = useState(autores);
  const [mensajeExito, setMensajeExito] = useState('');

  // Actualizar autores cuando cambien los autores
  React.useEffect(() => {
    setAutoresFiltrados(autores);
  }, [autores]);

  const manejarCrearNuevo = () => {
    setAutorEditando(null);
    setMostrarFormulario(true);
    setError(null);
  };

  const manejarEditar = (autor) => {
    setAutorEditando(autor);
    setMostrarFormulario(true);
    setError(null);
  };

  const manejarGuardar = async (datosAutor) => {
    setCargandoFormulario(true);
    try {
      if (autorEditando) {
        await actualizarAutor(autorEditando._id, datosAutor);
        setMensajeExito('Autor actualizado exitosamente');
      } else {
        await crearAutor(datosAutor);
        setMensajeExito('Autor creado exitosamente');
      }
      setMostrarFormulario(false);
      setAutorEditando(null);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al guardar autor:', error);
    } finally {
      setCargandoFormulario(false);
    }
  };

  const manejarCancelar = () => {
    setMostrarFormulario(false);
    setAutorEditando(null);
    setError(null);
  };

  const manejarEliminar = async (autorId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este autor?')) {
      try {
        await eliminarAutor(autorId);
        setMensajeExito('Autor eliminado exitosamente');
        setTimeout(() => setMensajeExito(''), 3000);
      } catch (error) {
        console.error('Error al eliminar autor:', error);
      }
    }
  };

  const manejarBuscar = async (termino) => {
    if (!termino.trim()) {
      setAutoresFiltrados(autores);
      return;
    }

    try {
      const respuesta = await autoresService.buscar(termino);
      setAutoresFiltrados(respuesta.datos || []);
    } catch (error) {
      console.error('Error al buscar autores:', error);
      setError('Error al buscar autores');
    }
  };

  return (
    <div>
      <EncabezadoPrincipal
        titulo="Gestión de Autores"
        subtitulo="Administra todos los autores de tu biblioteca"
        accion={
          !mostrarFormulario && (
            <button onClick={manejarCrearNuevo} className="btn-primario">
              Crear Nuevo Autor
            </button>
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
        <FormularioAutor
          autor={autorEditando}
          onGuardar={manejarGuardar}
          onCancelar={manejarCancelar}
          cargando={cargandoFormulario}
        />
      ) : (
        <ListaAutores
          autores={autoresFiltrados}
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

export default AutoresPage;