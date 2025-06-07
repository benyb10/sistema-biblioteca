import React from 'react';
import { Link } from 'react-router-dom';
import { useEstadisticas } from '../hooks/useEstadisticas';
import Cargando from '../componentes/common/Cargando';

const InicioPage = () => {
  const { estadisticas, cargando, error, cargarEstadisticas } = useEstadisticas();

  const tarjetas = [
    {
      titulo: 'Gestionar Autores',
      descripcion: 'Agregar, editar y administrar los autores de la biblioteca',
      enlace: '/autores',
    },
    {
      titulo: 'Gestionar Libros',
      descripcion: 'Administrar el catálogo completo de libros',
      enlace: '/libros',
    },
    {
      titulo: 'Crear Nuevo Libro',
      descripcion: 'Agregar un nuevo libro con sus autores',
      enlace: '/crear-libro',
    }
  ];

  //Refrescar estadísticas
  const refrescarEstadisticas = () => {
    cargarEstadisticas();
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="titulo-principal">
          Sistema de Gestión de Biblioteca
        </h1>
        <p className="subtitulo">
          Administra tu biblioteca de forma eficiente. Gestiona autores, libros y sus relaciones 
          en un solo lugar.
        </p>
      </div>

      <div className="grid-tarjetas">
        {tarjetas.map((tarjeta, indice) => (
          <Link
            key={indice}
            to={tarjeta.enlace}
            className="tarjeta"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                {tarjeta.titulo.charAt(0)}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem'
              }}>
                {tarjeta.titulo}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {tarjeta.descripcion}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="seccion">
        <div className="tarjeta">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: 'var(--color-text-primary)',
              margin: 0
            }}>
              Estadísticas Rápidas
            </h2>
            <button 
              onClick={refrescarEstadisticas}
              className="btn-secundario"
              disabled={cargando}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {cargando ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              Error al cargar estadísticas: {error}
            </div>
          )}

          {cargando ? (
            <Cargando mensaje="Cargando estadísticas..." />
          ) : (
            <div className="estadisticas-grid">
              <div className="estadistica-item">
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  backgroundColor: 'var(--color-primary)', 
                  borderRadius: '0.5rem',
                  margin: '0 auto 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  A
                </div>
                <div className="estadistica-numero">{estadisticas.totalAutores}</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Total Autores</p>
              </div>
              
              <div className="estadistica-item">
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  backgroundColor: 'var(--color-primary)', 
                  borderRadius: '0.5rem',
                  margin: '0 auto 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  L
                </div>
                <div className="estadistica-numero">{estadisticas.totalLibros}</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Total Libros</p>
              </div>
              
              <div className="estadistica-item">
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  backgroundColor: 'var(--color-primary)', 
                  borderRadius: '0.5rem',
                  margin: '0 auto 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  D
                </div>
                <div className="estadistica-numero">{estadisticas.librosDisponibles}</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Disponibles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InicioPage;