import React from 'react';

const PiePagina = () => {
  return (
    <footer style={{
      marginTop: '4rem',
      paddingTop: '2rem',
      borderTop: '1px solid var(--color-border)',
      textAlign: 'center'
    }}>
      <div className="contenedor-principal">
        <p style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem'
        }}>
          © {new Date().getFullYear()} Sistema de Gestión de Biblioteca. 
          Desarrollado para administrar tu biblioteca.
        </p>
      </div>
    </footer>
  );
};

export default PiePagina;