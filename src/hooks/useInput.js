import { useState } from "react";

const useInput = (validateValue) => {
    const [value, setValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (e) => {
        setValue(e.target.value);
    };

    const inputBlurHandler = (e) => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue("");
        setIsTouched(false);
    };

    return {
        value,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
