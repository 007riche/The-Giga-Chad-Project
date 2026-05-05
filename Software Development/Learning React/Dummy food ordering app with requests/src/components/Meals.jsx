import { useEffect, useState } from "react";
import MealItem from "./MealItems";

export default function Meals() {
    const [loadeMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                // return
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();

    }, []);

    return (
        <ul id="meals">
            {loadeMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}