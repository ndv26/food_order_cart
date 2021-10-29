import classes from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

const validateName = (name) => name.trim() !== "";
const validateNumber = (number) => number.trim().length === 10;
const validateAddress = (address) => address.trim() !== "";

const Checkout = (props) => {
    const {
        value: name,
        valueIsValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput(validateName);

    const {
        value: number,
        valueIsValid: numberIsValid,
        hasError: numberHasError,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
        reset: resetNumber,
    } = useInput(validateNumber);

    const {
        value: address,
        valueIsValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: resetAddress,
    } = useInput(validateAddress);

    // Form submission
    let formIsValid = false;
    if (nameIsValid && numberIsValid && addressIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!formIsValid) {
            nameBlurHandler();
            numberBlurHandler();
            addressBlurHandler();
            return;
        }
        props.sendOrderRequest({ name, number, address });
        resetName();
        resetNumber();
        resetAddress();
    };

    // Input Classes

    const nameClasses = nameHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    const numberClasses = numberHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    const addressClasses = addressHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameClasses}>
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={name}
                />
                {nameHasError && <p>Please enter your name.</p>}
            </div>
            <div className={numberClasses}>
                <label htmlFor="number">Phone number</label>
                <input
                    type="text"
                    id="number"
                    onChange={numberChangeHandler}
                    onBlur={numberBlurHandler}
                    value={number}
                />
                {numberHasError && <p>Please enter a valid phone number.</p>}
            </div>
            <div className={addressClasses}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                    value={address}
                />
                {addressHasError && <p>Please enter your address.</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.hideCartHandler}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
