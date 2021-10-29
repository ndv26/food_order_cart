import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnIsBump, setBtnIsBump] = useState(false);
    const { items } = useContext(CartContext);

    const numberCartItem = items.reduce((accNumber, curItem) => {
        return accNumber + curItem.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsBump ? classes.bump : ""}`;

    useEffect(() => {
        if (items.length === 0) return;
        setBtnIsBump(true);
        const timer = setTimeout(() => {
            setBtnIsBump(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.showCartHandler}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span className={classes.title}>Your Cart</span>
            <span className={classes.badge}>{numberCartItem}</span>
        </button>
    );
};

export default HeaderCartButton;
