import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../store/auth-slice';


const Header = () => {
  const logoutActionsDispatcher = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    logoutActionsDispatcher(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>{isAuthenticated ? 'My Products' : 'Products'}</a>
          </li>
          <li>
            {isAuthenticated &&
              <a href='/'>My Sales</a>
            }

          </li>
          {
            isAuthenticated && <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
