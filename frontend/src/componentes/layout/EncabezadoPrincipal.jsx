import React from 'react';

const EncabezadoPrincipal = ({ titulo, subtitulo, accion }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--color-text-primary)',
          marginBottom: '0.5rem'
        }}>
          {titulo}
        </h1>
        {subtitulo && (
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '1rem',
            maxWidth: '600px'
          }}>
            {subtitulo}
          </p>
        )}
      </div>
      {accion && (
        <div style={{ flexShrink: 0 }}>
          {accion}
        </div>
      )}
    </div>
  );
};

export default EncabezadoPrincipal;