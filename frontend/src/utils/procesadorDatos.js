import { capitalizarTexto, sanitizarTexto } from './validaciones';

// Procesar datos de autor antes de enviar al backend
export const procesarDatosAutor = (datosAutor) => {
  return {
    
    nombre: capitalizarTexto(sanitizarTexto(datosAutor.nombre || '')),
    apellido: capitalizarTexto(sanitizarTexto(datosAutor.apellido || '')),
    
    // Normalizar email
    email: datosAutor.email ? datosAutor.email.trim().toLowerCase() : '',
    
    
    nacionalidad: datosAutor.nacionalidad ? 
      capitalizarTexto(sanitizarTexto(datosAutor.nacionalidad)) : '',
    
    // Limpiar biografía
    biografia: datosAutor.biografia ? 
      sanitizarTexto(datosAutor.biografia.trim()) : '',
    
    // Limpiar URL
    sitioWeb: datosAutor.sitioWeb ? datosAutor.sitioWeb.trim() : '',
    
    
    fechaNacimiento: datosAutor.fechaNacimiento || null
  };
};

// Procesar datos de libro antes de enviar al backend
export const procesarDatosLibro = (datosLibro) => {
  return {
    // Capitalizar título
    titulo: capitalizarTexto(sanitizarTexto(datosLibro.titulo || '')),
    
    // Limpiar ISBN
    isbn: datosLibro.isbn ? datosLibro.isbn.replace(/[-\s]/g, '') : '',
    
    // Capitalizar editorial
    editorial: datosLibro.editorial ? 
      capitalizarTexto(sanitizarTexto(datosLibro.editorial)) : '',
    
    // Limpiar descripción
    descripcion: datosLibro.descripcion ? 
      sanitizarTexto(datosLibro.descripcion.trim()) : '',
    
    
    fechaPublicacion: datosLibro.fechaPublicacion || null,
    genero: datosLibro.genero || '',
    idioma: datosLibro.idioma || 'español',
    estado: datosLibro.estado || 'disponible',
    numeroPaginas: datosLibro.numeroPaginas ? parseInt(datosLibro.numeroPaginas) : null,
    autores: datosLibro.autores || []
  };
};