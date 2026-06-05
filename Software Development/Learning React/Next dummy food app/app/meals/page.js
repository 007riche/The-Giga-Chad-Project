import Link from "next/link";
import classes from "./page.module.css"
import MealsGrid from "../components/meals/meals-grid";
import { getAllMeals } from "../lib/meals";
import { Suspense } from "react";

async function Meals() {
    const meals = await getAllMeals();
    return <MealsGrid meals={meals} />
}

export default async function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created {' '/*To print a whitespace between the 
                    previous text and the span element*/}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}