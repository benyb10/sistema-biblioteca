// Validaciones para campos de texto
export const validarTexto = (valor, minimo = 1, maximo = 100) => {
  if (!valor || typeof valor !== 'string') {
    return 'Este campo es obligatorio';
  }
  
  const valorLimpio = valor.trim();
  
  if (valorLimpio.length < minimo) {
    return `Debe tener al menos ${minimo} caracteres`;
  }
  
  if (valorLimpio.length > maximo) {
    return `No puede exceder ${maximo} caracteres`;
  }
  
  return null;
};

// Validar nombres
export const validarNombre = (nombre) => {
  if (!nombre || !nombre.trim()) {
    return 'El nombre es obligatorio';
  }
  
  const nombreLimpio = nombre.trim();
  
  if (nombreLimpio.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (nombreLimpio.length > 50) {
    return 'El nombre no puede exceder 50 caracteres';
  }
  
  // Permitir solo letras, espacios, tildes
  const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!patronNombre.test(nombreLimpio)) {
    return 'El nombre solo puede contener letras y espacios';
  }
  
  return null;
};

// Validar email
export const validarEmail = (email) => {
  if (!email || !email.trim()) {
    return null; 
  }
  
  const emailLimpio = email.trim().toLowerCase();
  
  
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!patronEmail.test(emailLimpio)) {
    return 'Email no válido';
  }
  
  if (emailLimpio.length > 100) {
    return 'El email no puede exceder 100 caracteres';
  }
  
  return null;
};

// Validar URL
export const validarURL = (url) => {
  if (!url || !url.trim()) {
    return null; 
  }
  
  const urlLimpia = url.trim();
  
  try {
    new URL(urlLimpia);
    return null;
  } catch {
    return 'URL no válida (debe incluir http:// o https://)';
  }
};

// Validar ISBN
export const validarISBN = (isbn) => {
  if (!isbn || !isbn.trim()) {
    return null; 
  }
  
  
  const isbnLimpio = isbn.replace(/[-\s]/g, '');
  
  // Verificar que tenga números y X al final
  if (!/^[\d]{9}[\dX]$|^[\d]{13}$/.test(isbnLimpio)) {
    return 'ISBN debe tener 10 o 13 dígitos';
  }
  
  return null;
};

// Validar número de páginas
export const validarNumeroPaginas = (paginas) => {
  if (!paginas) {
    return null; 
  }
  
  const numero = parseInt(paginas);
  
  if (isNaN(numero)) {
    return 'Debe ser un número válido';
  }
  
  if (numero < 1) {
    return 'Debe ser mayor a 0';
  }
  
  if (numero > 10000) {
    return 'No puede exceder 10,000 páginas';
  }
  
  return null;
};

// Validar fecha
export const validarFecha = (fecha) => {
  if (!fecha) {
    return null; 
  }
  
  const fechaObj = new Date(fecha);
  
  if (isNaN(fechaObj.getTime())) {
    return 'Fecha no válida';
  }
  
  const hoy = new Date();
  if (fechaObj > hoy) {
    return 'La fecha no puede ser futura';
  }
  
  
  if (fechaObj.getFullYear() < 1) {
    return 'Fecha no válida';
  }
  
  return null;
};


export const normalizarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') {
    return '';
  }
  
  return texto
    .trim() 
    .replace(/\s+/g, ' ') 
    .toLowerCase() 
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, ''); // Remover tildes para búsquedas
};

// Función para capitalizar nombres
export const capitalizarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') {
    return '';
  }
  
  return texto
    .trim()
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

// Función para sanitizar entrada
export const sanitizarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') {
    return '';
  }
  
  return texto
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validación del autor
export const validarAutor = (datosAutor) => {
  const errores = {};
  
  // Validar nombre
  const errorNombre = validarNombre(datosAutor.nombre);
  if (errorNombre) errores.nombre = errorNombre;
  
  // Validar apellido
  const errorApellido = validarNombre(datosAutor.apellido);
  if (errorApellido) errores.apellido = errorApellido;
  
  // Validar email
  const errorEmail = validarEmail(datosAutor.email);
  if (errorEmail) errores.email = errorEmail;
  
  // Validar sitio web
  const errorURL = validarURL(datosAutor.sitioWeb);
  if (errorURL) errores.sitioWeb = errorURL;
  
  // Validar fecha de nacimiento
  const errorFecha = validarFecha(datosAutor.fechaNacimiento);
  if (errorFecha) errores.fechaNacimiento = errorFecha;
  
  // Validar nacionalidad
  if (datosAutor.nacionalidad) {
    const errorNacionalidad = validarTexto(datosAutor.nacionalidad, 2, 50);
    if (errorNacionalidad) errores.nacionalidad = errorNacionalidad;
  }
  
  // Validar biografía
  if (datosAutor.biografia) {
    const errorBiografia = validarTexto(datosAutor.biografia, 10, 1000);
    if (errorBiografia) errores.biografia = errorBiografia;
  }
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};

// Validación del libro
export const validarLibro = (datosLibro) => {
  const errores = {};
  
  // Validar título
  const errorTitulo = validarTexto(datosLibro.titulo, 1, 200);
  if (errorTitulo) errores.titulo = errorTitulo;
  
  // Validar ISBN
  const errorISBN = validarISBN(datosLibro.isbn);
  if (errorISBN) errores.isbn = errorISBN;
  
  // Validar número de páginas
  const errorPaginas = validarNumeroPaginas(datosLibro.numeroPaginas);
  if (errorPaginas) errores.numeroPaginas = errorPaginas;
  
  // Validar fecha de publicación
  const errorFecha = validarFecha(datosLibro.fechaPublicacion);
  if (errorFecha) errores.fechaPublicacion = errorFecha;
  

  if (datosLibro.editorial) {
    const errorEditorial = validarTexto(datosLibro.editorial, 2, 100);
    if (errorEditorial) errores.editorial = errorEditorial;
  }
  
  // Validar descripción
  if (datosLibro.descripcion) {
    const errorDescripcion = validarTexto(datosLibro.descripcion, 10, 2000);
    if (errorDescripcion) errores.descripcion = errorDescripcion;
  }
  
  // Validar que tenga al menos un autor
  if (!datosLibro.autores || datosLibro.autores.length === 0) {
    errores.autores = 'Debe seleccionar al menos un autor';
  }
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};