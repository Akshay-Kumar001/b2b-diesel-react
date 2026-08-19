import { createContext, useState } from "react";

const CartContext= createContext();

function CartProvider({children}) {

    const [cart, setCart] = useState([]);
    console.log("Cart:", cart);
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}
export {CartProvider};
export default CartContext;