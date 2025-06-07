import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navegacion = () => {
  const location = useLocation();

  const navegacionItems = [
    { path: '/', nombre: 'Inicio' },
    { path: '/autores', nombre: 'Autores' },
    { path: '/libros', nombre: 'Libros' },
    { path: '/crear-libro', nombre: 'Nuevo Libro' },
  ];

  return (
    <nav className="navegacion">
      <div className="contenedor-principal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              B
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              Sistema Biblioteca
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {navegacionItems.map((item) => {
              const esActivo = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navegacion-item ${esActivo ? 'activo' : ''}`}
                >
                  {item.nombre}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;