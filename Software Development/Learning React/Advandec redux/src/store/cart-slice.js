import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { DB_LINK } from '../environ';

const CART_DB_LINK = DB_LINK + 'cart.json';

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

// Action creator approach
// More reading on Thunks
// this action creator (seems to receive a function as argument)
// and returns a function as result
export const sendCartData = (cart) => {
    return async (dispatch) => {
        // state updation inside the side effect Logic
        // instead of side effect inside the state update logic, 
        // which is considered bad practice, since it usually 
        // leads to breaking the principle of store being immutable 
        // (Risk of updating manully the global store object 
        // instead of creating new copies with update at each manipulation) 
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data',
        }));

        // side effect, 
        const sendRequest = async () => {
            const response = await fetch(
                CART_DB_LINK, {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw new Error("Something went wrong when sending data.");
            }
            // const responseData = response.json();
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully',
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed',
            }));
        }
    }
}


export const cartActions = cartSlice.actions;
export default cartSlice;