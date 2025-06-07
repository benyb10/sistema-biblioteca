import apiClient from './apiConfig';

export const librosService = {
  // Obtener todos los libros
  obtenerTodos: async () => {
    try {
      const respuesta = await apiClient.get('/libros');
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al obtener libros: ' + error.message);
    }
  },

  // Obtener libro por ID
  obtenerPorId: async (id) => {
    try {
      const respuesta = await apiClient.get(`/libros/${id}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al obtener libro: ' + error.message);
    }
  },

  // Crear nuevo libro
  crear: async (datosLibro) => {
    try {
      const respuesta = await apiClient.post('/libros', datosLibro);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al crear libro: ' + error.message);
    }
  },

  // Actualizar libro
  actualizar: async (id, datosLibro) => {
    try {
      const respuesta = await apiClient.put(`/libros/${id}`, datosLibro);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al actualizar libro: ' + error.message);
    }
  },

  // Eliminar libro
  eliminar: async (id) => {
    try {
      const respuesta = await apiClient.delete(`/libros/${id}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al eliminar libro: ' + error.message);
    }
  },

  // Buscar libros
  buscar: async (parametros) => {
    try {
      const query = new URLSearchParams(parametros).toString();
      const respuesta = await apiClient.get(`/libros/buscar?${query}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al buscar libros: ' + error.message);
    }
  }
};