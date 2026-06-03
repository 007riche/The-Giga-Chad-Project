import Link from "next/link";

export default function Meals() {
    return (
        <main>
            <Link href="/">Home</Link>
            <Link href="/meals/share">Community share</Link>
            <ul>
                <li>
                    <Link href="/meals/burrata">Burrata</Link>
                </li>
                <Link href="/meals/carpaccio">Carpaccio</Link>
                <li><Link href="/meals/pizza">Pizza</Link></li>
            </ul>
        </main>
    );
}