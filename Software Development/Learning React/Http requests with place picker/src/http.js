const BASE_URL = 'http://localhost:3000';
const placesEndpoint = '/places';
const userPlacesEndpoint = '/user-places';


export async function fetchAvailablePlaces() {
    const response = await fetch(BASE_URL + placesEndpoint);
    const jsonResponseData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places data');
    }
    return jsonResponseData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch(BASE_URL + userPlacesEndpoint, {
        method: 'PUT',
        body: JSON.stringify({ places: places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }

    return resData.message;
}