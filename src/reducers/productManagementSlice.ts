import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for your product data
interface Product {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  // ... other fields
}

// Define a type for your product management state
interface ProductManagementState {
  products: Product[];
}

const productManagementSlice = createSlice({
  name: "productManagement",
  initialState: {
    products: [], // Store products here
  } as ProductManagementState, // Initialize with the correct type
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productManagementSlice.actions;

export default productManagementSlice.reducer;
