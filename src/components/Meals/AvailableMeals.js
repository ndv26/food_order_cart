import React, { useState, useEffect, useCallback } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [hasError, setHasError] = useState(null);

    const getAvailableMeals = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://food-order-app-backend-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const transformMealsData = [];
            for (let key in data) {
                transformMealsData.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setMeals(transformMealsData);
        } catch (error) {
            setHasError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getAvailableMeals();
    }, [getAvailableMeals]);

    if (hasError) {
        return (
            <section className={classes["meals-error"]}>
                <p>{hasError}</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={classes["meals-loading"]}>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meals.map((meal) => {
                        return (
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                price={meal.price}
                            />
                        );
                    })}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
