import logoImg from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-header.module.css";
import MainHeaderBackground from '@/app/components/main-header/main-header-background.js';
import NavLink from "../nav-link/nav-link";


export default function MainHeader() {
    // const path = usePathname(); // to hold the current navigation path
    // But is client side code to run 
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    {/* <img src={logoImg.src}
                    alt="A plate with food on it"
                /> */}
                    <Image src={logoImg}
                        alt="A plate with food on it" priority />
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            {/* <Link href="/meals"
                                className={path.startsWith("/meals") ? classes.active : undefined}
                            >Browse Meals</Link> */}
                            {/* conditionality executed on the client side */}
                            <NavLink href="/meals">Browse Meals</NavLink>
                            {/* scoped the client component to minize the position of the 
                            "use client" directive in the component tree */}
                        </li>
                        <li>
                            {/* <Link href="/community"
                                className={path === "/community" ? classes.active : undefined}
                            >Foodies Community</Link> */}
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>

    );
}