import React from 'react';
import InsectCard from '../insects/InsectCard';
import LoadingSpinner from '../common/LoadingSpinner';
import CheckoutForm from './CheckoutForm';

const CheckoutList = ({ getSummary, cart, shopping, setCart, addToCart, removeFromCart }) => {
    if (!cart || cart.length < 1) return <LoadingSpinner />;
    return (
        <div className="col-md-8 offset-md-2">
            {getSummary()}
            <div>
                {cart.map(c => (
                    <InsectCard
                        id={c.id}
                        species={c.species}
                        price={c.price}
                        url_image={c.url_image}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        shopping={shopping}
                    />
                ))}
            </div>
            <div className="total-price">
            </div>
            <CheckoutForm cart={cart} setCart={setCart} />
        </div>
    );
}

export default CheckoutList;
