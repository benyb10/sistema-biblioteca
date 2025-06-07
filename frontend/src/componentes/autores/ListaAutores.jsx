import React, { useState } from 'react';
import TarjetaAutor from './TarjetaAutor';
import Cargando from '../common/Cargando';

const ListaAutores = ({ 
  autores, 
  cargando, 
  error, 
  onEditar, 
  onEliminar, 
  onBuscar 
}) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const manejarBusqueda = (e) => {
    const termino = e.target.value;
    setTerminoBusqueda(termino);
    if (onBuscar) {
      onBuscar(termino);
    }
  };

  if (cargando) {
    return <Cargando mensaje="Cargando autores..." />;
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
      {/* Barra de búsqueda */}
      <div className="tarjeta" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              className="input-campo"
              placeholder="Buscar autores por nombre o apellido..."
              value={terminoBusqueda}
              onChange={manejarBusqueda}
            />
          </div>
          <div style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap'
          }}>
            {autores.length} autor{autores.length !== 1 ? 'es' : ''}
          </div>
        </div>
      </div>

      {/* Lista de autores */}
      {autores.length === 0 ? (
        <div className="tarjeta">
          <p style={{ 
            color: 'var(--color-text-secondary)', 
            textAlign: 'center',
            padding: '2rem'
          }}>
            {terminoBusqueda 
              ? `No se encontraron autores que coincidan con "${terminoBusqueda}"`
              : 'No hay autores registrados. ¡Crea el primero!'
            }
          </p>
        </div>
      ) : (
        <div className="grid-tarjetas">
          {autores.map((autor) => (
            <TarjetaAutor
              key={autor._id}
              autor={autor}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaAutores;