import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InsectList from '../insects/InsectList';
import CheckoutList from './CheckoutList';

function Shopping() {
    const [cart, setCart] = useState(() => {
        // Try to get the cart from Local Storage and parse it
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            return JSON.parse(savedCart);
        } else {
            return []; // Return an empty array if nothing is found
        }
    });
    const location = useLocation();

    useEffect(() => {
        // Clear the old cart from Local Storage
        localStorage.removeItem('shoppingCart');

        // Set the new cart to Local Storage
        if (cart.length > 0) {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
    }, [cart]); // Dependency array includes `cart` to run effect when it changes




    function addToCart(insect) {
        // Check if the cart already contains the insect
        const isInCart = cart.some(existingInsect => existingInsect.id === insect.id);

        if (!isInCart) {
            // Only add the insect if it's not already in the cart
            setCart(prevCart => [...prevCart, insect]);
            console.log("Added To Cart: ", insect);
        } else {
            console.log("Insect is already in the cart.");
        }
    }


    function removeFromCart(insectId) {
        console.log("Removing From Cart: ", insectId);
        setCart(currentCart => currentCart.filter(insect => insect.id !== insectId));

    }

    function getTotal() {
        let total = 0;
        for (let item of cart) {
            total += +item.price;
        }
        return total;
    }

    function getSummary() {
        let summary = `Items: ${cart.length} Total: $${getTotal(cart)}`;
        return <h3 id="summary">{summary}</h3>;
    }
    console.log(location);
    if (location.pathname === "/insects") {
        return (
            <InsectList getSummary={getSummary} cart={cart} setCart={setCart} addToCart={addToCart} />
        );
    } else {
        return (
            <CheckoutList getSummary={getSummary} cart={cart} setCart={setCart} addToCart={addToCart} removeFromCart={removeFromCart} />
        );
    }
}

export default Shopping;
