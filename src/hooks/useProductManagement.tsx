import { useState } from "react";
import {
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getAllProducts as apiGetAllProducts,
  buyProduct as apiBuyProduct,
} from "../services/api";
import { useAppDispatch } from ".";
import { setProducts as actionSetProducts } from "./../reducers/productManagementSlice";

export interface Product {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  // Add other fields as needed
}

interface ProductManagementHook {
  products: Product[];
  addProduct: (productData: any) => Promise<void>;
  editProduct: (productId: string, updatedData: any) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  purchaseProduct: (productId: string, quantity: number) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
}

export const useProductManagement = (): ProductManagementHook => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = async (productData: any) => {
    try {
      const response = await apiCreateProduct(productData);

      if (response) {
        setProducts([...products, response.data]);
        dispatch(actionSetProducts([...products, response.data]));
      } else {
        // Handle add product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const editProduct = async (productId: string, updatedData: any) => {
    try {
      const response = await apiUpdateProduct(productId, updatedData);

      if (response) {
        const updatedProducts = products.map((product) =>
          product._id === productId ? response.data : product
        );
        setProducts(updatedProducts);
        dispatch(actionSetProducts(updatedProducts));
      } else {
        // Handle edit product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const response = await apiDeleteProduct(productId);

      if (response) {
        const updatedProducts = products.filter(
          (product: Product) => product._id !== productId
        );
        setProducts(updatedProducts);
        dispatch(actionSetProducts(updatedProducts));
      } else {
        // Handle remove product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const purchaseProduct = async (productId: string, quantity: number) => {
    try {
      const response = await apiBuyProduct(productId, quantity);

      if (response) {
        const updatedProducts = products.filter(
          (product: Product) => product._id !== productId
        );
        setProducts(updatedProducts);
        dispatch(actionSetProducts(updatedProducts));
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
        dispatch(actionSetProducts(response));
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
    purchaseProduct,
    fetchAllProducts,
  };
};
