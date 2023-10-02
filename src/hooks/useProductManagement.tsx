import { useState } from "react";
import {
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getAllProducts as apiGetAllProducts,
} from "../services/api";

interface Product {
  _id: number;
  productName: string;
  amountAvailable: number;
  cost: number;
  // Add other fields as needed
}

interface ProductManagementHook {
  products: Product[];
  addProduct: (productData: any) => Promise<void>;
  editProduct: (productId: number, updatedData: any) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
}

export const useProductManagement = (): ProductManagementHook => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = async (productData: any) => {
    try {
      const response = await apiCreateProduct(productData);

      if (response.success) {
        setProducts([...products, response.data]);
      } else {
        // Handle add product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const editProduct = async (productId: number, updatedData: any) => {
    try {
      const response = await apiUpdateProduct(productId, updatedData);

      if (response.success) {
        const updatedProducts = products.map((product) =>
          product._id === productId ? response.data : product
        );
        setProducts(updatedProducts);
      } else {
        // Handle edit product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      const response = await apiDeleteProduct(productId);

      if (response.success) {
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);
      } else {
        // Handle remove product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await apiGetAllProducts();

      if (response) {
        setProducts(response);
      } else {
        // Handle fetch products error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return {
    products,
    addProduct,
    editProduct,
    removeProduct,
    fetchAllProducts,
  };
};
