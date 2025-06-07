import axios from 'axios';

const getApiBaseUrl = () => {
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // Si estás accediendo desde otra IP 
  return `http://${window.location.hostname}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

console.log('API URL configurada:', API_BASE_URL); // Para debug

export default apiClient;
export { API_BASE_URL };