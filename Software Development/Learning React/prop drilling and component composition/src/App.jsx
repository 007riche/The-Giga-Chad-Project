import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartContextProvider, { CartContext } from './store/shopping-carte-context.jsx';

function App() {

  return (
    // <CartContext.Provider ></CartContext.Provider> //for REact 
    // versions prior to 19
    // must have a default value, value={{ items: [] }}
    // <CartContext value={ctxValue}>
    <CartContextProvider>
      <Header
      // cart={shoppingCart}
      // onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop  >
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}
            //  onAddToCart={handleAddItemToCart} 
            />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
    // </CartContext>
  );
}

export default App;
