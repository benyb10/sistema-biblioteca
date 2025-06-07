import React, { useState, useEffect } from 'react';
import SelectorAutores from './SelectorAutores';
import { GENEROS_LIBROS, IDIOMAS, ESTADOS_LIBRO } from '../../utils/constantes';
import { validarLibro } from '../../utils/validaciones';
import { procesarDatosLibro } from '../../utils/procesadorDatos';

const FormularioLibro = ({ libro, onGuardar, onCancelar, cargando }) => {
  const [datos, setDatos] = useState({
    titulo: '',
    isbn: '',
    fechaPublicacion: '',
    genero: '',
    numeroPaginas: '',
    editorial: '',
    descripcion: '',
    idioma: 'español',
    estado: 'disponible',
    autores: []
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (libro) {

      const autoresFormateados = libro.autores ? libro.autores.map(autor => ({
        autorId: autor._id || autor.autorId,
        nombre: autor.nombre,
        apellido: autor.apellido,
        rolAutor: autor.rolAutor || 'principal'
      })) : [];

      setDatos({
        titulo: libro.titulo || '',
        isbn: libro.isbn || '',
        fechaPublicacion: libro.fechaPublicacion ? libro.fechaPublicacion.split('T')[0] : '',
        genero: libro.genero || '',
        numeroPaginas: libro.numeroPaginas || '',
        editorial: libro.editorial || '',
        descripcion: libro.descripcion || '',
        idioma: libro.idioma || 'español',
        estado: libro.estado || 'disponible',
        autores: autoresFormateados
      });
    } else {
      // Limpiar
      setDatos({
        titulo: '',
        isbn: '',
        fechaPublicacion: '',
        genero: '',
        numeroPaginas: '',
        editorial: '',
        descripcion: '',
        idioma: 'español',
        estado: 'disponible',
        autores: []
      });
    }
  }, [libro]);

  const validarFormulario = () => {
    const { esValido, errores: nuevosErrores } = validarLibro(datos);
    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      // Procesar datos antes de enviar
      const datosLimpios = procesarDatosLibro(datos);
      
      const datosFinales = {
        ...datosLimpios,
        autores: datos.autores.map(autor => ({
          autorId: autor.autorId,
          rolAutor: autor.rolAutor
        }))
      };
      
      console.log('Datos procesados a enviar:', datosFinales); // Para debug
      onGuardar(datosFinales);
    }
  };

  const manejarCambio = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: null }));
    }
  };

  const manejarCambioAutores = (autores) => {
    console.log('Autores cambiados:', autores); // Para debug
    setDatos(prev => ({ ...prev, autores }));
    if (errores.autores && autores.length > 0) {
      setErrores(prev => ({ ...prev, autores: null }));
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
        {libro ? 'Editar Libro' : 'Crear Nuevo Libro'}
      </h2>

      <form onSubmit={manejarEnvio}>
        {/* Información básica */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--color-text-primary)',
            marginBottom: '1rem'
          }}>
            Información Básica
          </h3>

          <div className="formulario-grupo">
            <label className="etiqueta">Título *</label>
            <input
              type="text"
              className="input-campo"
              value={datos.titulo}
              onChange={(e) => manejarCambio('titulo', e.target.value)}
              placeholder="Título del libro"
              maxLength="200"
            />
            {errores.titulo && <p className="texto-error">{errores.titulo}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="formulario-grupo">
              <label className="etiqueta">ISBN</label>
              <input
                type="text"
                className="input-campo"
                value={datos.isbn}
                onChange={(e) => manejarCambio('isbn', e.target.value)}
                placeholder="978-0123456789 o 0123456789X"
                maxLength="17"
              />
              {errores.isbn && <p className="texto-error">{errores.isbn}</p>}
            </div>

            <div className="formulario-grupo">
              <label className="etiqueta">Fecha de Publicación</label>
              <input
                type="date"
                className="input-campo"
                value={datos.fechaPublicacion}
                onChange={(e) => manejarCambio('fechaPublicacion', e.target.value)}
                max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
              />
              {errores.fechaPublicacion && <p className="texto-error">{errores.fechaPublicacion}</p>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="formulario-grupo">
              <label className="etiqueta">Género</label>
              <select
                className="input-campo"
                value={datos.genero}
                onChange={(e) => manejarCambio('genero', e.target.value)}
              >
                <option value="">Seleccionar género...</option>
                {GENEROS_LIBROS.map(genero => (
                  <option key={genero.valor} value={genero.valor}>
                    {genero.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div className="formulario-grupo">
              <label className="etiqueta">Idioma</label>
              <select
                className="input-campo"
                value={datos.idioma}
                onChange={(e) => manejarCambio('idioma', e.target.value)}
              >
                {IDIOMAS.map(idioma => (
                  <option key={idioma.valor} value={idioma.valor}>
                    {idioma.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div className="formulario-grupo">
              <label className="etiqueta">Estado</label>
              <select
                className="input-campo"
                value={datos.estado}
                onChange={(e) => manejarCambio('estado', e.target.value)}
              >
                {ESTADOS_LIBRO.map(estado => (
                  <option key={estado.valor} value={estado.valor}>
                    {estado.etiqueta}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="formulario-grupo">
              <label className="etiqueta">Editorial</label>
              <input
                type="text"
                className="input-campo"
                value={datos.editorial}
                onChange={(e) => manejarCambio('editorial', e.target.value)}
                placeholder="Nombre de la editorial"
                maxLength="100"
              />
              {errores.editorial && <p className="texto-error">{errores.editorial}</p>}
            </div>

            <div className="formulario-grupo">
              <label className="etiqueta">Número de Páginas</label>
              <input
                type="number"
                className="input-campo"
                value={datos.numeroPaginas}
                onChange={(e) => manejarCambio('numeroPaginas', e.target.value)}
                placeholder="Ej: 350"
                min="1"
                max="10000"
              />
              {errores.numeroPaginas && <p className="texto-error">{errores.numeroPaginas}</p>}
            </div>
          </div>

          <div className="formulario-grupo">
            <label className="etiqueta">Descripción</label>
            <textarea
              className="input-campo"
              value={datos.descripcion}
              onChange={(e) => manejarCambio('descripcion', e.target.value)}
              placeholder="Descripción del libro..."
              rows={4}
              maxLength="2000"
              style={{ resize: 'vertical', minHeight: '120px' }}
            />
            {errores.descripcion && <p className="texto-error">{errores.descripcion}</p>}
            {datos.descripcion && (
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '0.75rem', 
                marginTop: '0.25rem' 
              }}>
                {datos.descripcion.length}/2000 caracteres
              </p>
            )}
          </div>
        </div>

        {/* Selector de autores */}
        <div style={{ marginBottom: '2rem' }}>
          <SelectorAutores
            autoresSeleccionados={datos.autores}
            onChange={manejarCambioAutores}
          />
          {errores.autores && <p className="texto-error">{errores.autores}</p>}
        </div>

        {/* Botones */}
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
            {cargando ? 'Guardando...' : (libro ? 'Actualizar Libro' : 'Crear Libro')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLibro;