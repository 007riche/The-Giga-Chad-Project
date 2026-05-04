import { useState } from "react";

export function useInput(defaultValue, validationFunction) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didBlured, setDidBlur] = useState(false);
    const isValueValid = validationFunction(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidBlur(false);
    }

    function handleInputBlur() {
        setDidBlur(true);
    }

    return {
        value: enteredValue,
        handleInputBlur,
        handleInputChange,
        isNotValid: didBlured && !isValueValid
    };
}