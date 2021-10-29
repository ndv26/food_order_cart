import React, { useState, useContext } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
    const { items, totalAmount, addItem, removeItem, resetCart } =
        useContext(CartContext);
    const [checkoutShown, setCheckoutShown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemAddHandler = (item) => {
        addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        removeItem(id);
    };

    const showCheckoutHandler = () => {
        setCheckoutShown(true);
    };

    const sendOrderRequest = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch(
            "https://food-order-app-backend-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderList: items,
                    totalAmount,
                    name: userData.name,
                    number: userData.number,
                    address: userData.address,
                }),
            }
        );
        if (!response.ok) {
            throw new Error("Fail to order. Please try again!");
        }

        resetCart();
        setIsSubmitting(false);
        setDidSubmit(true);
    };

    const hasItems = items.length > 0;
    const cartList = (
        <ul className={classes["cart-items"]}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={() => cartItemAddHandler(item)}
                    onRemove={() => cartItemRemoveHandler(item.id)}
                />
            ))}
        </ul>
    );
    const modalActions = (
        <div className={classes.actions}>
            <button
                className={classes["button--alt"]}
                onClick={props.hideCartHandler}
            >
                Close
            </button>
            {hasItems && (
                <button
                    className={classes.button}
                    onClick={showCheckoutHandler}
                >
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartList}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{`$${+totalAmount.toFixed(2)}`}</span>
            </div>
            {checkoutShown && totalAmount > 0 && (
                <Checkout
                    hideCartHandler={props.hideCartHandler}
                    sendOrderRequest={sendOrderRequest}
                />
            )}
            {!checkoutShown && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <Loader />;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Succesfully Ordered!</p>
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={props.hideCartHandler}
                >
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal hideCartHandler={props.hideCartHandler}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
}
