import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
import { DB_LINK } from '../environ';

const CART_DB_LINK = DB_LINK + 'cart.json';

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
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
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

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(CART_DB_LINK);
            if (!response.ok) {
                throw new Error("Could not fetch cart data ");
            }
            const data = await response.json();
            return data;
        }

        try {
            const savedCartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: savedCartData.items || [],
                totalQuantity: savedCartData.totalQuantity,
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