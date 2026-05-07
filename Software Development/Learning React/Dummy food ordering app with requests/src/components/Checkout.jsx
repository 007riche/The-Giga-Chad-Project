import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgessContext from "../store/UserProgresContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgessCtx = useContext(UserProgessContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleClose() {
        userProgessCtx.hideCheckout()
    }

    return (
        <Modal open={userProgessCtx.progress === 'checkout'}
            onClose={handleClose}
        >
            <form >
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)} </p>
                <Input label="Full name" type="text" id="full-name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}