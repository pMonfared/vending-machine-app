import axios from "axios";
import { store } from "../store";

// Define your base URL here
const baseURL = "http://localhost:3000";

// Create an instance of Axios with a base URL and default headers
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add authorization token if available in the Redux store
api.interceptors.request.use((request) => {
  const token = store.getState().auth.token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle API errors here
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("API Error Status:", error.response.status);
      console.error("API Error Data:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("API Request Error:", error.message);
    }
    // Propagate the error for further handling in hooks/pages
    throw error;
  }
);

// Define the API functions for your endpoints

// Auth API
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  username: string,
  password: string,
  role: string
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define the ProductData type
interface ProductData {
  productName: string;
  cost: number;
  // Add other fields as needed
}

// Product API
export const createProduct = async (productData: ProductData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  updatedData: ProductData
) => {
  try {
    const response = await api.put(`/products/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMyPurchasedProducts = async () => {
  try {
    const response = await api.get("/products/purchased");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Buy Product API
export const buyProduct = async (productId: string, quantity: number) => {
  try {
    const response = await api.post(`/products/buy`, { productId, quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add deposit
export const updateDeposit = async (amount: number) => {
  try {
    const response = await api.post("/users/deposit", { amount });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset deposit
export const resetDeposit = async () => {
  try {
    const response = await api.post("/users/deposit/reset");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
