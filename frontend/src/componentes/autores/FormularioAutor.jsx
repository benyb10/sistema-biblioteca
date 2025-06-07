import React, { useState, useEffect } from 'react';
import { validarAutor } from '../../utils/validaciones';
import { procesarDatosAutor } from '../../utils/procesadorDatos';

const FormularioAutor = ({ autor, onGuardar, onCancelar, cargando }) => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    nacionalidad: '',
    biografia: '',
    email: '',
    sitioWeb: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (autor) {
      setDatos({
        nombre: autor.nombre || '',
        apellido: autor.apellido || '',
        fechaNacimiento: autor.fechaNacimiento ? autor.fechaNacimiento.split('T')[0] : '',
        nacionalidad: autor.nacionalidad || '',
        biografia: autor.biografia || '',
        email: autor.email || '',
        sitioWeb: autor.sitioWeb || ''
      });
    } else {
      // Limpiar
      setDatos({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        nacionalidad: '',
        biografia: '',
        email: '',
        sitioWeb: ''
      });
    }
  }, [autor]);

  const validarFormulario = () => {
    const { esValido, errores: nuevosErrores } = validarAutor(datos);
    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      // Procesar datos antes de enviar
      const datosLimpios = procesarDatosAutor(datos);
      console.log('Datos procesados a enviar:', datosLimpios); // Para debug
      onGuardar(datosLimpios);
    }
  };

  const manejarCambio = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: null }));
    }
  };

  return (
    <div className="tarjeta">
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--color-text-primary)',
        marginBottom: '1.5rem'
      }}>
        {autor ? 'Editar Autor' : 'Crear Nuevo Autor'}
      </h2>

      <form onSubmit={manejarEnvio}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="formulario-grupo">
            <label className="etiqueta">Nombre *</label>
            <input
              type="text"
              className="input-campo"
              value={datos.nombre}
              onChange={(e) => manejarCambio('nombre', e.target.value)}
              placeholder="Nombre del autor"
              maxLength="50"
            />
            {errores.nombre && <p className="texto-error">{errores.nombre}</p>}
          </div>

          <div className="formulario-grupo">
            <label className="etiqueta">Apellido *</label>
            <input
              type="text"
              className="input-campo"
              value={datos.apellido}
              onChange={(e) => manejarCambio('apellido', e.target.value)}
              placeholder="Apellido del autor"
              maxLength="50"
            />
            {errores.apellido && <p className="texto-error">{errores.apellido}</p>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="formulario-grupo">
            <label className="etiqueta">Fecha de Nacimiento</label>
            <input
              type="date"
              className="input-campo"
              value={datos.fechaNacimiento}
              onChange={(e) => manejarCambio('fechaNacimiento', e.target.value)}
              max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
            />
            {errores.fechaNacimiento && <p className="texto-error">{errores.fechaNacimiento}</p>}
          </div>

          <div className="formulario-grupo">
            <label className="etiqueta">Nacionalidad</label>
            <input
              type="text"
              className="input-campo"
              value={datos.nacionalidad}
              onChange={(e) => manejarCambio('nacionalidad', e.target.value)}
              placeholder="Ej: Colombiano, Mexicano..."
              maxLength="50"
            />
            {errores.nacionalidad && <p className="texto-error">{errores.nacionalidad}</p>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="formulario-grupo">
            <label className="etiqueta">Email</label>
            <input
              type="email"
              className="input-campo"
              value={datos.email}
              onChange={(e) => manejarCambio('email', e.target.value)}
              placeholder="correo@ejemplo.com"
              maxLength="100"
            />
            {errores.email && <p className="texto-error">{errores.email}</p>}
          </div>

          <div className="formulario-grupo">
            <label className="etiqueta">Sitio Web</label>
            <input
              type="url"
              className="input-campo"
              value={datos.sitioWeb}
              onChange={(e) => manejarCambio('sitioWeb', e.target.value)}
              placeholder="https://ejemplo.com"
            />
            {errores.sitioWeb && <p className="texto-error">{errores.sitioWeb}</p>}
          </div>
        </div>

        <div className="formulario-grupo">
          <label className="etiqueta">Biografía</label>
          <textarea
            className="input-campo"
            value={datos.biografia}
            onChange={(e) => manejarCambio('biografia', e.target.value)}
            placeholder="Información sobre el autor..."
            rows={4}
            maxLength="1000"
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
          {errores.biografia && <p className="texto-error">{errores.biografia}</p>}
          {datos.biografia && (
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '0.75rem', 
              marginTop: '0.25rem' 
            }}>
              {datos.biografia.length}/1000 caracteres
            </p>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'flex-end',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-border)'
        }}>
          <button 
            type="button" 
            onClick={onCancelar}
            className="btn-secundario"
            disabled={cargando}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primario"
            disabled={cargando}
          >
            {cargando ? 'Guardando...' : (autor ? 'Actualizar Autor' : 'Crear Autor')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioAutor;