import Link from "next/link";

export default function ShareMealPage() {
    return (
        <main>
            <Link href="/">Home</Link>
            <Link href="/meals">Meals</Link>
            <p>The most shared meals</p>
        </main>
    );
}