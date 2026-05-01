import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from '../Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js';


export default function AvailablePlaces({ onSelectPlace }) {
  const [isFecthing, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();


  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(position.coords.latitude,
            position.coords.longitude);

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });


      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch palces, please try later'
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();

    // This also does work fine
    // fetch(BASE_URL + placesEndpoint)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((jsonResponseData) => {
    //     setAvailablePlaces(
    //       jsonResponseData.places
    //     );
    //     // console.log(jsonResponseData);
    //   });
  }, []);

  if (error) {
    return <ErrorPage title="Something went wrong" message={error.message} />
  }


  return (
    <Places
      title="Available Places"
      places={[]}
      isLoading={isFecthing}
      loadingText="Fetching places data"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
