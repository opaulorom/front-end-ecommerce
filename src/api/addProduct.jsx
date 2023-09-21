// src/api.js (ou outro nome apropriado)
import axios from 'axios';

// Função para adicionar um novo produto
export function addProduct(productData) {
  return axios.post('/api/products', productData);
}
