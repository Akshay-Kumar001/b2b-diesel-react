import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (productId) => {
  const updatedCart = cart.map((item) =>
    item._id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  setCart(updatedCart);
};

const decreaseQuantity = (productId) => {
  const updatedCart = cart
    .map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCart(updatedCart);
};

const removeFromCart = (productId) => {
  const updatedCart = cart.filter(
    (item) => item._id !== productId
  );

  setCart(updatedCart);
};
 console.log(cart);
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;