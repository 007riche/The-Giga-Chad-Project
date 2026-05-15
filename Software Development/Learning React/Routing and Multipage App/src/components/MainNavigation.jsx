import { Link, NavLink } from "react-router";
import cssClasses from './MainNavigation.module.css';
function MainNavigation() {

    return (<header className={cssClasses.header}>
        <nav>
            <ul className={cssClasses.list}>
                <li>
                    <NavLink to=""
                        className={({ isActive }) => isActive ? cssClasses.active : undefined}
                        end
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="products"
                        className={({ isActive }) => isActive ? cssClasses.active : undefined}
                    >
                        Products
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>);
}

export default MainNavigation;