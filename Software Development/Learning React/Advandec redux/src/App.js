import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

// For manipulating env content
import 'dotenv/config';
import { useEffect } from 'react';

// DB link

const DB_LINK = process.env.DB_LINK;
const CART_DB_LINK = DB_LINK + 'cart.json';

function App() {
  const showCart = useSelector(globalStore => globalStore.ui.cartIsVisible);
  const cart = useSelector(globalStore => globalStore.cart);

  // side effect out side of the store, to keep the store clean,
  // to avoid breaking immutability of the global store
  useEffect(() => {
    fetch(
      CART_DB_LINK, {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />};
      <Products />
    </Layout>
  );
}

export default App;
