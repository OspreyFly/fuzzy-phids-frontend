import React from 'react';
import InsectCard from '../insects/InsectCard';
import LoadingSpinner from '../common/LoadingSpinner';
import CheckoutForm from './CheckoutForm';
import './CheckoutList.css';

const CheckoutList = ({ currentUser, getSummary, cart, shopping, setCart, addToCart, removeFromCart }) => {
    if (!cart) return <LoadingSpinner />;
    if (cart.length < 1) return <div><h1 className="warning">Your cart is empty!</h1></div>;
    return (
        <div >
            {getSummary()}
            <div className="Checkout-list">
                {cart.map(c => (
                    <InsectCard class="card"
                        id={c.id}
                        species={c.species}
                        price={c.price}
                        url_image={c.url_image}
                        cart={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        shopping={shopping}
                    />
                ))}
            </div>
            <div className="total-price">
            </div>
            <CheckoutForm currentUser={currentUser} cart={cart} setCart={setCart} />
        </div>
    );
}

export default CheckoutList;
