import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureConter.jsx';

function App() {
  log('<App /> rendered');


  // Initially here, Moved and scoped to ConfigureCounter
  // const [enteredNumber, setEnteredNumber] = useState(0);

  // function handleChange(event) {
  //   setEnteredNumber(+event.target.value);
  // }

  // function handleSetClick() {
  //   setChosenCount(enteredNumber);
  //   setEnteredNumber(0);
  // }

  // Lifted state
  const [chosenCount, setChosenCount] = useState(0);

  // Lifted updation
  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        {/* 
        Initially here, Moved and scoped to ConfigureCounter
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>  //This triggered the
          // re-execution of the APP component
        </section> */}
        <ConfigureCounter onSet={handleSetCount /** This now scopes the 
          execution to this sub component */ } />
        <Counter initialCount={chosenCount} key={chosenCount /** the state as key triggers the
           counter re-exec, but should be stricly mapped to only 
           a single element in the rendered DOM */} />
        {/* <Counter initialCount={chosenCount} />   Linked to the top instance */}
        {/* because both are affected by the same state object 'chosenCount' */}
        <Counter initialCount={0}
        // key={chosenCount} will cause an error, as already assigned to another
        // component, here on the above Counter 
        />  {/* Isolated */}
      </main>
    </>
  );
}

export default App;
