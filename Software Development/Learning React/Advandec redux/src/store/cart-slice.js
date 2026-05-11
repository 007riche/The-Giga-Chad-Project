import { createSlice } from "@reduxjs/toolkit";

const intialCartState = {
    items: [],
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: intialCartState,
    reducers: {
        addItemSingleItemToCart(state, action) {
            const newItem = action.payload;
            state.totalQuantity++;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            if (!existingItem) {
                // Mutations of the existing state, but fine
                // Redux-toolkit gots us covered
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                // Mutations of the existing state, but fine
                // Redux-toolkit gots us covered
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            state.totalQuantity--;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;