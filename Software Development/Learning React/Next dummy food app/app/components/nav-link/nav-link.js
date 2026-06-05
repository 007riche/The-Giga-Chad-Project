"use client"; // Marked as client side component
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "@/app/components/nav-link/nav-link.module.css";

export default function NavLink({ href, children }) {
    const path = usePathname(); // to hold the current navigation path

    return (
        <Link href={href}
            className={path.startsWith(href)
                ? `${classes.link}  ${classes.active}` :
                classes.link
            }
        >
            {children}
        </Link>
    );
}