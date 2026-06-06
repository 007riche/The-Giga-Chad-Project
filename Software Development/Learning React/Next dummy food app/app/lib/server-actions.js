'use server';

export async function shareMeal(formData) {
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
}