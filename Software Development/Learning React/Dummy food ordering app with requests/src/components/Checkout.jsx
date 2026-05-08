import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgessContext from "../store/UserProgresContext";
import useHttp from "../hooks/useHttp";
import Error from "./ErrorPage";


// Minimum request payload
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgessCtx = useContext(UserProgessContext);

    const { data, isLoading: isSending, error, sendRequest } =
        useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    let actions = (<>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </>);

    if (isSending) {
        actions = <span>Sending your order...</span>
    }

    if (data && !error) {
        return <Modal open={userProgessCtx.progress === 'checkout'}
            onClose={handleClose}>
            <h2>Order successfully received!</h2>
            <p>Your order has been successfully submited.</p>
            <p>We handle the rest!</p>
            <p className="modal-actions">
                <Button onClick={handleClose}>Okay</Button>
            </p>
        </Modal>
    }

    function handleClose() {
        userProgessCtx.hideCheckout()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            }));
    }

    return (
        <Modal open={userProgessCtx.progress === 'checkout'}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)} </p>
                <Input label="Full name" type="text" id="name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit your order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}