import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification/Notification';

// For manipulating env content
// import 'dotenv/config'; // not working
import { Fragment, useEffect } from 'react';
import { DB_LINK } from './environ';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';

// DB link
// const DB_LINK = process.env.DB_LINK;
const CART_DB_LINK = DB_LINK + 'cart.json';

let isInitialLoading = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(globalStore => globalStore.ui.cartIsVisible);
  const cart = useSelector(globalStore => globalStore.cart);
  const notification = useSelector(globalStore => globalStore.ui.notification);

  // side effect out side of the store, to keep the store clean,
  // to avoid breaking immutability of the global store
  useEffect(() => {
    // Migrated to action creators
    if (isInitialLoading) {
      isInitialLoading = false;
      return;
    }
    dispatch(sendCartData(cart)); //
  }, [cart, dispatch]);

  useEffect(() => {
    if (cart.stateChanged) {
      dispatch(fetchCartData());
    }
  }, [dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />};
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
