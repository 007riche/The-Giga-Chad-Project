import { useEffect, useState } from "react";

export function useFecth() {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState();

    useEffect(() => {
        async function fetchFn() {
            setIsFetching(true);
            try {
                const places = await fetchUserPlaces();
                setUserPlaces(places);
                console.log("user places:", places);

            } catch (error) {
                setError({ message: error.message || "Failed to fetch user's places" });
            }
            setIsFetching(false);
        }
        fetchPlaces();
    }, [fetchFn]);
    return {
        isFetching,
        fetchedData,
        error
    };
}