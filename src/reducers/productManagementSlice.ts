import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for your product data
interface Product {
  id: number;
  name: string;
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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productManagementSlice.actions;

export default productManagementSlice.reducer;
