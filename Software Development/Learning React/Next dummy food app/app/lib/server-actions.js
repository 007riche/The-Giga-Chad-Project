'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim === '';
}

export async function shareMeal(prevState, formData) {
    // 'use server' // Requiered other functions and To explicitly garanty 
    // it will run on the server
    // in conjunction with the async 
    // keyword here to notify it is a server action
    // This usage directly in a component my cause a clash 
    // between the 'use client' and 'use server' 
    // directives if in the same component
    // hence outsourced here

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions)
        ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@')
        || !meal.image
        || meal.image.size === 0) {
        // throw new Error('Invalid input');
        return {
            message: 'Invalid input.'
        }
    }

    await saveMeal(meal);
    revalidatePath('/meals'
        // , 'layout' // extra config for granular control, here if set,
        // only the layout will be revalidated 
    ); // Revalidate a route to get up to date data loaded on 
    // that path or route,
    redirect("/meals");
}