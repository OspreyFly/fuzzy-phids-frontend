import React from 'react';
import InsectCard from '../insects/InsectCard';
import LoadingSpinner from '../common/LoadingSpinner';
import CheckoutForm from './CheckoutForm';

function CheckoutList(props) {
    console.log("State Init", shopping, cart);
    const cart = props.getCart();
    if (!cart || cart.length < 1) return <LoadingSpinner />;

    function getTotal(cart) {
        let total = 0;
        for (let item of cart) {
            total += item.price;
        }
        return total;
    }

    return (
        <div className="col-md-8 offset-md-2">
            <div className="cart">
                {cart.map(c => (
                    <InsectCard
                        key={c.id}
                        species={c.species}
                        price={c.price}
                        url_image={c.url_image}
                        removeFromCart={props.removeFromCart}
                    />
                ))}
            </div>
            <div className="total-price">
                Total: $ {getTotal(cart)}
            </div>
            <CheckoutForm />
        </div>
    );
}

export default CheckoutList;
