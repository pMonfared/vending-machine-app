import { useState } from "react";
import { buyProducts as apiBuyProducts } from "../services/api";

interface Product {
  id: number;
  productName: string;
  cost: number;
  // Add other fields as needed
}

interface ShoppingCartHook {
  cart: Product[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  checkout: () => Promise<void>;
}

export const useShoppingCart = (): ShoppingCartHook => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setTotalPrice(totalPrice + product.cost);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);

    const removedProduct = cart.find((product) => product.id === productId);
    if (removedProduct) {
      setTotalPrice(totalPrice - removedProduct.cost);
    }
  };

  const checkout = async () => {
    try {
      const response = await apiBuyProducts(cart);

      if (response.success) {
        setCart([]);
        setTotalPrice(0);
      } else {
        // Handle checkout error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return {
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    checkout,
  };
};
