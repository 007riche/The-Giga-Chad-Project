import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import UserProgessContext from "../store/UserProgresContext";
import CartItem from "./CartItem";

export default function Cart() {
    // Contexts
    const cartCx = useContext(CartContext);
    const userProgessCtx = useContext(UserProgessContext);

    const cartTotal = cartCx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgessCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgessCtx.progress === 'cart'}>
            <h2>Your cart</h2>
            <ul>
                {cartCx.items.map((item) => (
                    // <li key={item.id}>
                    //     {item.name} - {item.quantity}
                    // </li>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCx.addItem(item)}
                        onDecrease={() => cartCx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(cartTotal)}
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Got to checkout</Button>
            </p>
        </Modal>
    );
}