import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

// For manipulating env content
// import 'dotenv/config'; // not working
import { useEffect } from 'react';
import { DB_LINK } from './environ';
import { uiActions } from './store/ui-slice';

// DB link

// const DB_LINK = process.env.DB_LINK;
const CART_DB_LINK = DB_LINK + 'cart.json';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(globalStore => globalStore.ui.cartIsVisible);
  const cart = useSelector(globalStore => globalStore.cart);

  // side effect out side of the store, to keep the store clean,
  // to avoid breaking immutability of the global store
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({

      }));
      const response = fetch(
        CART_DB_LINK, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Something went wrong when sending data.");

      }

      const responseData = (await response).json();
    }
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />};
      <Products />
    </Layout>
  );
}

export default App;
