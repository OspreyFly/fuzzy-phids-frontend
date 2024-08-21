import React, { useState } from 'react';
import InsectList from '../insects/InsectList';
import CheckoutList from './CheckoutList';

function Shopping() {
    const [shopping, setShopping] = useState(true);
    const [cart, setCart] = useState([]);
    console.log("State Init", shopping, cart);
    function getCart() {
        return cart;
    }
    // Function to add an insect to the cart
    function addToCart(insect) {
        setCart([...cart, insect]); // Spread operator to create a new array with the added insect
    }

    // Function to remove an insect from the cart
    function removeFromCart(insectId) {
        setCart(cart.filter(insect => insect.id !== insectId)); // Filter out the insect with the matching id
    }

    function getShoppingMode() {
        return shopping;
    }

    // Toggle shopping mode
    function toggleShoppingMode() {
        setShopping(!shopping); // Toggle the shopping state
    }

    // Pass methods as props to child components
    return (
        shopping ?
            <InsectList getCart={getCart} addToCart={addToCart} getShoppingMode={getShoppingMode} toggleShoppingMode={toggleShoppingMode} /> :
            <CheckoutList getCart={getCart} addToCart={addToCart} removeFromCart={removeFromCart} toggleShoppingMode={toggleShoppingMode} />
    );
}

export default Shopping;
