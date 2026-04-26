import { useRef, useState } from "react";

export default function Player() {
  // Refs, always have a "current" property set on them
  // they can be created using the useRef hook

  // Refs vs State
  // refs can be used where the manipulation (fetch, assignment...) of data 
  // should not trigger the component re-evaluation (basically rebuild) just 
  // like states enforce this behavior on in these king of data 
  // manipulation tasks.
  // They can still be used to access DOM element directly through the .current 
  // property embedded

  const playerNameRef = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  function handleChangeName() {
    setEnteredPlayerName(playerNameRef.current.value);
    playerNameRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"} </h2>
      <p>
        <input type="text"
          ref={playerNameRef}
        />
        <button onClick={handleChangeName}>Set Name</button>
      </p>
    </section>
  );
}
