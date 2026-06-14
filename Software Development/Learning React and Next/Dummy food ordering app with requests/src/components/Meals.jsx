import { useEffect, useState } from "react";
import MealItem from "./MealItems";
import useHttp from "../hooks/useHttp";
import Error from "./ErrorPage";

// Outside of the component function to avoid recreating it as a new object 
// each time the com fx re-renders (that usually create infinite loops)
const requestConfig = {};

export default function Meals() {
    const { data: loadeMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fecthing data, please have patience...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadeMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}