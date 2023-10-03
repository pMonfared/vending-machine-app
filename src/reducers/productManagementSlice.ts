import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for your product data
interface Product {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  // ... other fields
}

export interface PurchasedProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalCost: number;
  // Add other fields as needed
}

// Define a type for your product management state
interface ProductManagementState {
  products: Product[];
  myPurchasedProducts: PurchasedProduct[];
}

const productManagementSlice = createSlice({
  name: "productManagement",
  initialState: {
    products: [],
    myPurchasedProducts: [], // Store products here
  } as ProductManagementState, // Initialize with the correct type
  reducers: {
    setMyPurchasedProducts: (
      state,
      action: PayloadAction<PurchasedProduct[]>
    ) => {
      state.myPurchasedProducts = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      try {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      } catch (error) {
        console.log("slice updateProduct error", error);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const {
  setMyPurchasedProducts,
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = productManagementSlice.actions;

export default productManagementSlice.reducer;
