import apiClient from './apiConfig';

export const autoresService = {
  // Obtener todos los autores
  obtenerTodos: async () => {
    try {
      const respuesta = await apiClient.get('/autores');
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al obtener autores: ' + error.message);
    }
  },

  // Obtener autor por ID
  obtenerPorId: async (id) => {
    try {
      const respuesta = await apiClient.get(`/autores/${id}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al obtener autor: ' + error.message);
    }
  },

  // Crear nuevo autor
  crear: async (datosAutor) => {
    try {
      const respuesta = await apiClient.post('/autores', datosAutor);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al crear autor: ' + error.message);
    }
  },

  // Actualizar autor
  actualizar: async (id, datosAutor) => {
    try {
      const respuesta = await apiClient.put(`/autores/${id}`, datosAutor);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al actualizar autor: ' + error.message);
    }
  },

  // Eliminar autor
  eliminar: async (id) => {
    try {
      const respuesta = await apiClient.delete(`/autores/${id}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al eliminar autor: ' + error.message);
    }
  },

  // Buscar autores
  buscar: async (termino) => {
    try {
      const respuesta = await apiClient.get(`/autores/buscar?busqueda=${termino}`);
      return respuesta.data;
    } catch (error) {
      throw new Error('Error al buscar autores: ' + error.message);
    }
  }
};