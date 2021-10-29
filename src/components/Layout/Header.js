import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton showCartHandler={props.showCartHandler} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="reactmeals-background" />
            </div>
        </React.Fragment>
    );
};

export default React.memo(Header);
