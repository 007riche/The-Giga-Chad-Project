import Header from "./components/Header"
import InvestmentForm from "./components/form/InvestmentForm"
import Results from "./components/table/Results"
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isValidUserInput = userInput.duration >= 1;

  function handleUserInputChange(inputIdentifier, newValue) {
    setUserInput(previousUserInput => {
      return {
        ...previousUserInput,
        [inputIdentifier]: +newValue
      };
    });
  }

  return (
    <>
      <Header />
      <InvestmentForm
        userInput={userInput}
        onChangeDispatched={handleUserInputChange}
      />
      {isValidUserInput && <Results userInput={userInput} />}
      {!isValidUserInput && <p className="center">Please, Enter a duration superior to zero</p>}

    </>
  )
}

export default App
