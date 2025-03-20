import { useState } from "react";

export function useInput(defaultValue, validateFunc) {
    const [enteredValue, setEnteredValue] = useState(defaultValue)
    const [didEditValue, setDidEditValue] = useState(false)

    const valueInvalid = !validateFunc(enteredValue)

    const handleValueChange = (event) => {
        setEnteredValue(event.target.value)
        setDidEditValue(false)
    }

    const handleValueBlur = () => {
        setDidEditValue(true)
    }

    return {
        value: enteredValue,
        handleValueChange,
        handleValueBlur,
        hasError: didEditValue && valueInvalid,
        setEnteredValue,
        setDidEditValue
    }
}