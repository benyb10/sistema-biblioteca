import React, { useState } from 'react';

const TarjetaAutor = ({ autor, onEditar, onEliminar }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'No especificada';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const manejarEliminar = () => {
    onEliminar(autor._id);
    setMostrarConfirmacion(false);
  };

  return (
    <div className="tarjeta">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-text-primary)',
          marginBottom: '0.5rem'
        }}>
          {autor.nombre} {autor.apellido}
        </h3>
        
        {autor.nacionalidad && (
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '0.25rem'
          }}>
            <strong>Nacionalidad:</strong> {autor.nacionalidad}
          </p>
        )}
        
        <p style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem',
          marginBottom: '0.25rem'
        }}>
          <strong>Fecha de nacimiento:</strong> {formatearFecha(autor.fechaNacimiento)}
        </p>
        
        {autor.email && (
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '0.25rem'
          }}>
            <strong>Email:</strong> {autor.email}
          </p>
        )}
      </div>

      {autor.biografia && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {autor.biografia}
          </p>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        justifyContent: 'flex-end',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border)'
      }}>
        <button 
          onClick={() => onEditar(autor)}
          className="btn-secundario"
          style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
        >
          Editar
        </button>
        
        {!mostrarConfirmacion ? (
          <button 
            onClick={() => setMostrarConfirmacion(true)}
            className="btn-peligro"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Eliminar
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button 
              onClick={manejarEliminar}
              className="btn-peligro"
              style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
            >
              Confirmar
            </button>
            <button 
              onClick={() => setMostrarConfirmacion(false)}
              className="btn-secundario"
              style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarjetaAutor;