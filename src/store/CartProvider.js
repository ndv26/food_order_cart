import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.payload.price * action.payload.amount;
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        if (existingItem) {
            const updatedExistingItem = {
                ...existingItem,
                amount: existingItem.amount + action.payload.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedExistingItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === "REMOVE") {
        const needRemovingItemIndex = state.items.findIndex(
            (item) => item.id === action.payload
        );
        const needRemovingItem = state.items[needRemovingItemIndex];
        const updatedTotalAmount = state.totalAmount - needRemovingItem.price;
        let updatedItems;
        if (needRemovingItem.amount === 1) {
            updatedItems = state.items.filter(
                (item) => item.id !== action.payload
            );
        } else {
            const updatedNeedRemovingItem = {
                ...needRemovingItem,
                amount: needRemovingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[needRemovingItemIndex] = updatedNeedRemovingItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === "RESET") {
        return defaultCartState;
    }
    return defaultCartState;
};

export default function CartContextProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", payload: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", payload: id });
    };

    const resetCart = () => {
        dispatchCartAction({ type: "RESET" });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        resetCart: resetCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}
