import React, { useState, useEffect } from 'react';
import { autoresService } from '../../servicios/autoresService';
import { ROLES_AUTOR } from '../../utils/constantes';

const SelectorAutores = ({ autoresSeleccionados = [], onChange }) => {
  const [autoresDisponibles, setAutoresDisponibles] = useState([]);
  const [cargandoAutores, setCargandoAutores] = useState(false);
  const [autorSeleccionado, setAutorSeleccionado] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('principal');

  useEffect(() => {
    cargarAutores();
  }, []);

  const cargarAutores = async () => {
    setCargandoAutores(true);
    try {
      const respuesta = await autoresService.obtenerTodos();
      setAutoresDisponibles(respuesta.datos || []);
    } catch (error) {
      console.error('Error cargando autores:', error);
    } finally {
      setCargandoAutores(false);
    }
  };

  const agregarAutor = () => {
    if (!autorSeleccionado) return;

    const autor = autoresDisponibles.find(a => a._id === autorSeleccionado);
    if (!autor) return;

    // Verificar que no esté agregado
    const yaExiste = autoresSeleccionados.some(a => a.autorId === autorSeleccionado);
    if (yaExiste) return;

    const nuevoAutor = {
      autorId: autor._id,
      nombre: autor.nombre,
      apellido: autor.apellido,
      rolAutor: rolSeleccionado
    };

    onChange([...autoresSeleccionados, nuevoAutor]);
    setAutorSeleccionado('');
    setRolSeleccionado('principal');
  };

  const eliminarAutor = (autorId) => {
    onChange(autoresSeleccionados.filter(a => a.autorId !== autorId));
  };

  const actualizarRol = (autorId, nuevoRol) => {
    onChange(
      autoresSeleccionados.map(a => 
        a.autorId === autorId ? { ...a, rolAutor: nuevoRol } : a
      )
    );
  };

  return (
    <div>
      <label className="etiqueta">Autores del Libro</label>
      
      {/* Selector para agregar autores */}
      <div className="tarjeta" style={{ marginBottom: '1rem' }}>
        <h4 style={{ 
          color: 'var(--color-text-primary)', 
          marginBottom: '1rem',
          fontSize: '1rem',
          fontWeight: '600'
        }}>
          Agregar Autor
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label className="etiqueta" style={{ fontSize: '0.875rem' }}>Autor</label>
            <select
              className="input-campo"
              value={autorSeleccionado}
              onChange={(e) => setAutorSeleccionado(e.target.value)}
              disabled={cargandoAutores}
            >
              <option value="">Seleccionar autor...</option>
              {autoresDisponibles.map(autor => (
                <option key={autor._id} value={autor._id}>
                  {autor.nombre} {autor.apellido}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="etiqueta" style={{ fontSize: '0.875rem' }}>Rol</label>
            <select
              className="input-campo"
              value={rolSeleccionado}
              onChange={(e) => setRolSeleccionado(e.target.value)}
            >
              {ROLES_AUTOR.map(rol => (
                <option key={rol.valor} value={rol.valor}>
                  {rol.etiqueta}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            onClick={agregarAutor}
            className="btn-primario"
            disabled={!autorSeleccionado || cargandoAutores}
            style={{ height: 'fit-content' }}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de autores seleccionados */}
      {autoresSeleccionados.length > 0 && (
        <div className="tarjeta">
          <h4 style={{ 
            color: 'var(--color-text-primary)', 
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            Autores Seleccionados ({autoresSeleccionados.length})
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {autoresSeleccionados.map((autor, index) => (
              <div 
                key={autor.autorId}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto auto', 
                  gap: '0.5rem', 
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontWeight: '500',
                    marginBottom: '0.25rem'
                  }}>
                    {autor.nombre} {autor.apellido}
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem'
                  }}>
                    {ROLES_AUTOR.find(r => r.valor === autor.rolAutor)?.etiqueta || autor.rolAutor}
                  </p>
                </div>
                
                <select
                  value={autor.rolAutor}
                  onChange={(e) => actualizarRol(autor.autorId, e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.25rem',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {ROLES_AUTOR.map(rol => (
                    <option key={rol.valor} value={rol.valor}>
                      {rol.etiqueta}
                    </option>
                  ))}
                </select>
                
                <button
                  type="button"
                  onClick={() => eliminarAutor(autor.autorId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {autoresSeleccionados.length === 0 && (
        <div style={{ 
          padding: '1rem',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem',
          border: '1px dashed var(--color-border)',
          borderRadius: '0.5rem'
        }}>
          No hay autores seleccionados. Agrega al menos un autor.
        </div>
      )}
    </div>
  );
};

export default SelectorAutores;