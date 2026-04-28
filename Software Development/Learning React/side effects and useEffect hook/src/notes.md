`Side effects` in react are tasks that need to get executed in a component without impacting that component rendering cycle (I guess an example is these kind of detached background function that in a component) 

```
useEffect(() => {
    // Side Effect block
    const timer = setTimeout(() => {
      const ref1 = onConfirm; // different as JS object in memory
      // from the one set in 
      // the deps arrays each time the block of the side effect is 
      // reconstructed each time this component or 
      // its "parent" component is re-created 
      // even though it both reference have the same logic body
      let seOC = new WeakRef(ref1);
      ref1();
      console.log("Ref#1:" + seOC.deref());
    }, TIMER);

    // UseEffect Clean up function
    // This clean up Fx runs between subsequent executions of 
    // the side effects block
    return () => {
      let ptr = new WeakRef(onConfirm);
      console.log("Ref#2:" + ptr.deref());
      clearTimeout(timer);
    };
  },
    [onConfirm] // Deps array
  ); // This code can be buggy due to the difference of the 'onConfirm' in Deps 
  // and the one used in the side effect block
  // here in this case, this migth lead to infinite loop
  // because the first time the modal is rendrer forces the APP
  // to re-execute for the second time and all of the internal
  // object of its first rendering are now different from the "same"
  // objects rendered the second time the APP components is rendered, in
  // memory per say, even though all this memory have the same body
  // or definition i.e. their References change in memory each rendering
  // cycle of the component, BUT, useEffect seems to use
  // the same references in memory of declared dependencies
  // through out the lifecycle of the side effect.

  // obj@ParentComp#Time-1 = ptr->obj@ChildComp#Time-1  == ptr->obj@ChildComp#Time-1
  // but
  // obj@ParentComp#Time-2 ≠≠ ptr->obj@ChildComp#Time-2 == ptr->obj@ChildComp#Time-1
  // and
  // ptr->obj@ChildComp#Time-N == ptr->obj@ChildComp#Time-(N-1) == ...
  // == ptr->obj@ChildComp#Time-2 == ptr->obj@ChildComp#Time-1

  // The solution to solve this?
  // one approach is the useCallBack on the object that should be used
  //  later as a useEffect dependency wherever its has to be 
  // even to be passed as a ref 
  // useCallback(obj, [useCallBackDepsArray]);
  
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
  
  ```
