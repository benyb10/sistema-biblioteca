import React, { useState } from 'react';
import TarjetaLibro from './TarjetaLibro';
import Cargando from '../common/Cargando';
import { GENEROS_LIBROS, ESTADOS_LIBRO } from '../../utils/constantes';

const ListaLibros = ({ 
  libros, 
  cargando, 
  error, 
  onEditar, 
  onEliminar, 
  onBuscar 
}) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    genero: '',
    estado: ''
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const manejarCambioFiltro = (campo, valor) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    
    if (onBuscar) {
      onBuscar(nuevosFiltros);
    }
  };

  const limpiarFiltros = () => {
    const filtrosVacios = { busqueda: '', genero: '', estado: '' };
    setFiltros(filtrosVacios);
    if (onBuscar) {
      onBuscar(filtrosVacios);
    }
  };

  const hayFiltrosActivos = Object.values(filtros).some(valor => valor !== '');

  if (cargando) {
    return <Cargando mensaje="Cargando libros..." />;
  }

  if (error) {
    return (
      <div className="tarjeta">
        <p style={{ 
          color: '#ef4444', 
          textAlign: 'center',
          padding: '1rem'
        }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de búsqueda y filtros */}
      <div className="tarjeta" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              className="input-campo"
              placeholder="Buscar libros por título, editorial o descripción..."
              value={filtros.busqueda}
              onChange={(e) => manejarCambioFiltro('busqueda', e.target.value)}
            />
          </div>
          
          <button
            type="button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="btn-secundario"
          >
            {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
          
          <div style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap'
          }}>
            {libros.length} libro{libros.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Filtros avanzados */}
        {mostrarFiltros && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)'
          }}>
            <div>
              <label className="etiqueta" style={{ fontSize: '0.875rem' }}>Género</label>
              <select
                className="input-campo"
                value={filtros.genero}
                onChange={(e) => manejarCambioFiltro('genero', e.target.value)}
              >
                <option value="">Todos los géneros</option>
                {GENEROS_LIBROS.map(genero => (
                  <option key={genero.valor} value={genero.valor}>
                    {genero.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="etiqueta" style={{ fontSize: '0.875rem' }}>Estado</label>
              <select
                className="input-campo"
                value={filtros.estado}
                onChange={(e) => manejarCambioFiltro('estado', e.target.value)}
              >
                <option value="">Todos los estados</option>
                {ESTADOS_LIBRO.map(estado => (
                  <option key={estado.valor} value={estado.valor}>
                    {estado.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'end' }}>
              {hayFiltrosActivos && (
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="btn-secundario"
                  style={{ width: '100%' }}
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lista de libros */}
      {libros.length === 0 ? (
        <div className="tarjeta">
          <p style={{ 
            color: 'var(--color-text-secondary)', 
            textAlign: 'center',
            padding: '2rem'
          }}>
            {hayFiltrosActivos 
              ? 'No se encontraron libros que coincidan con los filtros aplicados'
              : 'No hay libros registrados. ¡Crea el primero!'
            }
          </p>
        </div>
      ) : (
        <div className="grid-tarjetas">
          {libros.map((libro) => (
            <TarjetaLibro
              key={libro._id}
              libro={libro}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaLibros;