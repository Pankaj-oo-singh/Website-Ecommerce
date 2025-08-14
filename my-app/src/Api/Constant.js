import { getToken } from "../Utils/Jwt-Utils";
export const API_URLS = {
    // GET_PRODUCTS: '/api/products',
    // GET_PRODUCT: (id) => `/api/products/${id}`,
    GET_CATEGORIES: '/api/category/getAllCategory',  // Updated URL
    GET_CATEGORY: (id) => `/api/category/${id}`,
    GET_PRODUCTS: '/api/products',
  GET_PRODUCT: (id) => `/api/products/${id}`,
}


export const BASE_URL = 'http://localhost:8081';


export const getHeaders = () => {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json', // ✅ Add this
  };
};
