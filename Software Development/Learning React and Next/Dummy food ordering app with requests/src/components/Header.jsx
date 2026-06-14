import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgessContext from '../store/UserProgresContext';

export default function Header() {
    // Contexts
    const cartCtx = useContext(CartContext);
    const userProgessCtx = useContext(UserProgessContext);

    const totalCartItems = cartCtx.items.reduce((totalCartItems, item) => {
        return totalCartItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgessCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt="The web application logo" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly>
                    Cart {totalCartItems}
                </Button>
            </nav>
        </header>
    );
}