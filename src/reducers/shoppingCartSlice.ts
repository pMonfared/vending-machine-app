import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for your cart item
interface CartItem {
  productId: number;
  quantity: number;
  // ... other fields
}

// Define a type for your shopping cart state
interface ShoppingCartState {
  items: CartItem[];
}

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    items: [], // Store cart items here
  } as ShoppingCartState, // Initialize with the correct type
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addItemToCart, updateCartItem, removeItemFromCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
