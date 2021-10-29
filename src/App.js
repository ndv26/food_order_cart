import React, { useState, useCallback } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    // useCallback for not render the Header components everytime cartIsShown
    const showCartHandler = useCallback(() => {
        setCartIsShown(true);
    }, []);

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <div className="App">
            {cartIsShown && <Cart hideCartHandler={hideCartHandler} />}
            <Header showCartHandler={showCartHandler} />
            <main>
                <Meals />
            </main>
        </div>
    );
}

export default App;
