import { createContext } from "react";
import { useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

// React context are one solution to managing the state of
//  data in react,
// it is similar to the Consumer provider in flutter
// here, it is export in order to be used as wraper component 
// around fragments or components that need where the state of 
// the data transmitted between different components needs 
// to be managed 

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

export default function CartContextProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === id);
                updatedItems.push({
                    id: id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                items: updatedItems,
            };
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
            };
        });
    }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return <CartContext value={ctxValue}>
        {children}
    </CartContext>;
}