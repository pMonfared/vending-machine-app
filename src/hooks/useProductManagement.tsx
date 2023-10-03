import {
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getAllProducts as apiGetAllProducts,
  getAllMyPurchasedProducts as apiGetAllMyPurchasedProducts,
  buyProduct as apiBuyProduct,
} from "../services/api";
import { useAppDispatch, useAppSelector } from ".";
import {
  setProducts as actionSetProducts,
  updateProduct as actionUpdateProduct,
  setMyPurchasedProducts as actionSetMyPurchasedProducts,
} from "./../reducers/productManagementSlice";

import { updateDeposit as actionUpdateDeposit } from "./../reducers/authSlice";

export interface Product {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  // Add other fields as needed
}

interface ProductManagementHook {
  products: any;
  myPurchasedProducts: any;
  addProduct: (productData: any) => Promise<void>;
  editProduct: (productId: string, updatedData: any) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  purchaseProduct: (productId: string, quantity: number) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
  fetchAllMyPurchasedProducts: () => Promise<void>;
}

export const useProductManagement = (): ProductManagementHook => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: any) => state.productManagment.products
  );

  const myPurchasedProducts = useAppSelector(
    (state: any) => state.productManagment.myPurchasedProducts
  );

  const addProduct = async (productData: any) => {
    try {
      const response = await apiCreateProduct(productData);

      if (response) {
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
        const updatedProducts = products.map((product: Product) =>
          product._id === productId ? response.data : product
        );
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
        dispatch(actionSetProducts(updatedProducts));
      } else {
        // Handle remove product error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const purchaseProduct = async (productId: string, quantity: number) => {
    const response = await apiBuyProduct(productId, quantity);

    if (response) {
      dispatch(actionUpdateDeposit(response.userDeposit));

      let foundProduct = products.find(
        (product: Product) => product._id === productId
      );

      let product = { ...foundProduct };
      if (product) {
        product.amountAvailable = response.productsPurchased.amountAvailable;

        let updatedProducts = products.map((product: Product) =>
          product._id === productId ? product : product
        );
        dispatch(actionSetProducts(updatedProducts));
        dispatch(actionUpdateProduct(product));
      }
    } else {
      // Handle remove product error
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await apiGetAllProducts();

      if (response) {
        dispatch(actionSetProducts(response));
      } else {
        // Handle fetch products error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  const fetchAllMyPurchasedProducts = async () => {
    try {
      const response = await apiGetAllMyPurchasedProducts();

      if (response) {
        dispatch(actionSetMyPurchasedProducts(response));
      } else {
        // Handle fetch products error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return {
    products,
    myPurchasedProducts,
    addProduct,
    editProduct,
    removeProduct,
    purchaseProduct,
    fetchAllProducts,
    fetchAllMyPurchasedProducts,
  };
};
