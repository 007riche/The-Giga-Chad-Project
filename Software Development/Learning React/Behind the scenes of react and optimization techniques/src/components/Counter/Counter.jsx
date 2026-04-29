import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// As first optimized, usefull,
// After preventing the re-rendering of Parent component APP, 
// it does no more require memo and instead costs evaluation of props changes
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // const initialCountIsPrime = isPrime(initialCount); // Also rebuilt 
  // as different objects in memory at each cycle

  const initialCountIsPrime = useMemo(() => isPrime(initialCount)
    ,
    [initialCount]); // re-exec only if initialCount changes

  // useEffect(() => {
  //   setCounterChanges([{
  //     value: initialCount,
  //     id: Math.random() * 1000
  //   }]);
  // }, [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  // const [counterChanges, setCounterChanges] = useState([initialCount]);
  const [counterChanges, setCounterChanges] = useState([{
    value: initialCount,
    id: Math.random() * 1000, // used as key to uniquely map to element
  }]);


  const currentCounter = counterChanges.reduce(
    // (prevCounter, counterChange) => prevCounter + counterChange,
    (prevCounter, counterChange) => prevCounter + counterChange.value,

    0
  );

  // Recreated as different objects each reval cycle of 
  // Counter even though the contain the same logic
  // function handleDecrement() {
  //   setCounter((prevCounter) => prevCounter - 1);
  // }
  // function handleIncrement() {
  //   setCounter((prevCounter) => prevCounter + 1);
  // }

  // same refs through Counter reval cycles
  // So maintained as same on <IconButton icon={MinusIcon} 
  // onClick={handleDecrement----+   } >
  //                             | 
  //          +------------------+
  //          |
  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      // -1, // introduces jumping state 
      {
        value: -1,
        id: Math.random() * 1000
      },
      ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      // 1,  // Jumping states
      {
        value: 1,
        id: Math.random() * 1000
      },
      ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement /* the Rendering condion linked to
          the counter state*/}>
          Decrement
        </IconButton>
        {/* <CounterOutput value={counter} /> */}
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement /* the Rendering condion linked to
          the counter state*/}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter