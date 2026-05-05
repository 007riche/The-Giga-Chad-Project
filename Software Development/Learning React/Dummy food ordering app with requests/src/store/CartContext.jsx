import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
});
function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingCartItemIndex = state.items[existingCartItemIndex];
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
    }
    if (action.type === 'REMOVE_ITEM') {

    }

    return { ...state, items: updatedItems };
}

export function CartContextProvider({ children }) {
    useReducer(cartReducer, { items: [] });


    return <CartContext.Provider>
        {children}
    </CartContext.Provider>;
}
export default CartContext;