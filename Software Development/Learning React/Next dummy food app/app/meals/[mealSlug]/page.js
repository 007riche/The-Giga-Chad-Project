import Link from "next/link";

export default function MealDetailPage({ params }) {
    return (
        <main>
            <Link href="/">Home</Link>
            <Link href="/meals">Meals</Link>
            <h2>Recipe of {params.mealSlug}</h2>
        </main>
    );
}