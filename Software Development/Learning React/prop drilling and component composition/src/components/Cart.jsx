import { useContext } from "react";
import { CartContext } from "../store/shopping-carte-context";

// useContext, use are react hooks that allows us to consumes a context

export default function Cart(
  // {
  //   // onUpdateItemQuantity
  // }
) {
  // const cartCtx = useContext(CartContext);
  const { items, updateItemQuantity } = useContext(CartContext);

  // const cartCtx = use(CartContext); // ver.19 and more flexible
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  // Another way to consume a context is to use this form of 
  // the Context component
  // <CartContext.Consumer> {(ctxName) => {
  // processing
  // consumer fragment
  // }}
  // </CartContext.Consumer>

  return (
    <div id="cart">
      {/* {cartCtx.items.length === 0 && <p>No items in cart!</p>} 
      when using const cartCtx = useContext(CartContext);
       */}
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  {/* <button onClick={() => onUpdateItemQuantity(item.id, -1)}> */}
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  {/* <button onClick={() => onUpdateItemQuantity(item.id, 1)}> */}
                  <button onClick={() => updateItemQuantity(item.id, 1)}>

                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
