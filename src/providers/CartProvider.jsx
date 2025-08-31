import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("items")) || {}
    );

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    function addToCart(product) {
        setItems((prev) => {
            const newItems = { ...prev };

            newItems[product.id] = {
                ...product,
                count: 1,
            };

            return newItems;
        });
    }
    function deleteOneFromCart(id) {
        setItems((prev) => {
            const newItems = { ...prev };

            newItems[id] = {
                ...newItems[id],
                count: newItems[id].count - 1,
            };
            if (newItems[id].count == 0) {
                delete newItems[id];
            }

            return newItems;
        });
    }

    function addOneToCart(id) {
        setItems((prev) => {
            const newItems = { ...prev };

            newItems[id] = {
                ...newItems[id],
                count: newItems[id].count + 1,
            };

            return newItems;
        });
    }

    function clearCart() {
        setItems({});
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                addOneToCart,
                deleteOneFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
