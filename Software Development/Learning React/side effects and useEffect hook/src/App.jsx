import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map(
  (id) => AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  // const modal = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [nearByPlaces, setNearByPlaces] = useState([]);

  // Example of side effect
  // we might need to know the user's geolocation, but we do not
  // want the demand to trigger the re-rendering of the APP
  // component, and also as side note, if it had to trigger the re-rendering
  // we might get into an infinite loop (firstRend->geoloc->ReRend->geoloc->ReRend->geoloc
  // ->ReRend ....)
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const sortedPlacesByDistance = sortPlacesByDistance(
  //     AVAILABLE_PLACES,
  //     position.coords.latitude,
  //     position.coords.latitude);

  //   setNearByPlaces(sortedPlacesByDistance);
  // });

  // solution: useEffect
  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlacesByDistance = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.latitude);

        setNearByPlaces(sortedPlacesByDistance);
      }); // Executed only after the APP component rendering is done
    },
    [] // Array of dependencies
  ); // costs execution computation, use this with caution
  // Usefull though to prevent infinite loop

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);

  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // Example of side effect that does not need useEffect
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }

  }


  // because its passed later as a useEffect deps in other components
  const handleRemovePlace = useCallback(
    // Classical un-wrapped
    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      // modal.current.close();
      setModalIsOpen(false);
      const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      localStorage.setItem('selectedPlaces',
        JSON.stringify(storedIds.filter((id) => id !== selectedPlace))
      );

    }
    // Classical un-wrapped
    ,
    [] // useCallBack Deps to trck their changes
  );

  return (
    <>
      <Modal
        // ref={modal}
        open={modalIsOpen}
      >
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
