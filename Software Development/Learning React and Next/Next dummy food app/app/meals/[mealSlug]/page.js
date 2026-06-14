import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import { getMeal } from "@/app/lib/meals";
import { notFound } from "next/navigation";

// The function tasked to generate metadata dynamically
// It has to be called like this
export async function generateMetadata({
    params // Can also recive all the loaded data from the route
}) {
    const meal = await getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    // console.log(meal);

    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default async function MealDetailPage({ params }) {
    const meal = await getMeal(params.mealSlug);

    if (!meal) {
        notFound(); // triggers the call of the closest not-found page
    }

    meal.instructions = meal.instructions?.replace(/\n/g, '<br />');
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    );
}