import React, { useState } from 'react';
import { GENEROS_LIBROS, ESTADOS_LIBRO, IDIOMAS } from '../../utils/constantes';

const TarjetaLibro = ({ libro, onEditar, onEliminar }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'No especificada';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerEtiquetaGenero = (valor) => {
    return GENEROS_LIBROS.find(g => g.valor === valor)?.etiqueta || valor;
  };

  const obtenerEtiquetaEstado = (valor) => {
    return ESTADOS_LIBRO.find(e => e.valor === valor)?.etiqueta || valor;
  };

  const obtenerEtiquetaIdioma = (valor) => {
    return IDIOMAS.find(i => i.valor === valor)?.etiqueta || valor;
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'disponible': return 'var(--color-primary)';
      case 'prestado': return '#f59e0b';
      case 'mantenimiento': return '#6b7280';
      case 'perdido': return '#ef4444';
      default: return 'var(--color-text-secondary)';
    }
  };

  const manejarEliminar = () => {
    onEliminar(libro._id);
    setMostrarConfirmacion(false);
  };

  return (
    <div className="tarjeta">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-text-primary)',
          marginBottom: '0.5rem',
          lineHeight: '1.3'
        }}>
          {libro.titulo}
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          marginBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: obtenerColorEstado(libro.estado),
            color: 'white',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {obtenerEtiquetaEstado(libro.estado)}
          </span>
          
          {libro.genero && (
            <span style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem'
            }}>
              {obtenerEtiquetaGenero(libro.genero)}
            </span>
          )}
        </div>
      </div>

      {/* Información básica */}
      <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
        {libro.isbn && (
          <p style={{ 
            color: 'var(--color-text-secondary)',
            marginBottom: '0.25rem'
          }}>
            <strong>ISBN:</strong> {libro.isbn}
          </p>
        )}
        
        <p style={{ 
          color: 'var(--color-text-secondary)',
          marginBottom: '0.25rem'
        }}>
          <strong>Publicación:</strong> {formatearFecha(libro.fechaPublicacion)}
        </p>
        
        {libro.editorial && (
          <p style={{ 
            color: 'var(--color-text-secondary)',
            marginBottom: '0.25rem'
          }}>
            <strong>Editorial:</strong> {libro.editorial}
          </p>
        )}
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {libro.numeroPaginas && (
            <span style={{ color: 'var(--color-text-secondary)' }}>
              <strong>Páginas:</strong> {libro.numeroPaginas}
            </span>
          )}
          
          {libro.idioma && (
            <span style={{ color: 'var(--color-text-secondary)' }}>
              <strong>Idioma:</strong> {obtenerEtiquetaIdioma(libro.idioma)}
            </span>
          )}
        </div>
      </div>

      {/* Autores */}
      {libro.autores && libro.autores.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ 
            color: 'var(--color-text-primary)',
            fontWeight: '500',
            marginBottom: '0.5rem',
            fontSize: '0.875rem'
          }}>
            Autores:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {libro.autores.map((autor, index) => (
              <span
                key={index}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)'
                }}
              >
                {autor.nombre} {autor.apellido}
                {autor.rolAutor !== 'principal' && (
                  <span style={{ color: 'var(--color-primary)' }}>
                    {' '}({autor.rolAutor})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Descripción */}
      {libro.descripcion && (
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
            {libro.descripcion}
          </p>
        </div>
      )}

      {/* Acciones */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        justifyContent: 'flex-end',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border)'
      }}>
        <button 
          onClick={() => onEditar(libro)}
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

export default TarjetaLibro;