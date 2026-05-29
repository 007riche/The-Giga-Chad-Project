const BASE_URL = 'http://localhost:3000/events';

export async function fetchEvents({ signal // this is provided by @tanstack/query 
    // to manage the continuity of the request.
    , searchTerm }) {
    let url = BASE_URL;
    if (searchTerm) {
        url += '?search=' + searchTerm;
    }

    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();

    return events;
}