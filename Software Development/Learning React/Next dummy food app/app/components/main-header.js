import logoImg from "@/assets/logo.png";
import Link from "next/link";

export default function MainHeader() {
    return (
        <header>
            <Link href="/">
                <img src={logoImg.src}
                    alt="A plate with food on it"
                />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/meals">Browse Meals</Link>
                    </li>
                    <li>
                        <Link href="/communinty">Foodies Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}