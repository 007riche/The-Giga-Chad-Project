import { useEffect, useState } from "react";
import MealItem from "./MealItems";
import useHttp from "../hooks/useHttp";

// Outside of the component function to avoid recreating it as a new object 
// each time the com fx re-renders (that usually create infinite loops)
const requestConfig = {};

export default function Meals() {
    const { data: loadeMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p>Fecthing data, please have patience...</p>
    }

    return (
        <ul id="meals">
            {loadeMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}