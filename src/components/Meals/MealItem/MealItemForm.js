import React, { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
    const amountInputRef = useRef();
    const formSubmitHandler = (event) => {
        event.preventDefault();
        let inputAmount = amountInputRef.current.value;
        let inputAmountNumber = +inputAmount;
        if (
            inputAmount.trim().length === 0 ||
            inputAmountNumber < 0 ||
            inputAmountNumber > 5
        ) {
            return;
        }
        return props.onAddToCart(inputAmountNumber);
    };
    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <Input
                ref={amountInputRef}
                label={"Amount"}
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>Add</button>
        </form>
    );
}
