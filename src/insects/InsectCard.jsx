import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./InsectCard.css";

/** Show limited information about an insect
 *
 * Is rendered by InsectList to show a "card" for each insect.
 *
 * InsectList -> InsectCard
 */
const InsectCard = ({ id, species, price, url_image, addToCart, removeFromCart }) => {
    const location = useLocation();
    const isCheckoutRoute = location.pathname === '/checkout';
    const handleAddClick = () => {
        addToCart({ id, species, price, url_image });
    }
    const handleRemoveClick = () => {
        removeFromCart(id);
    }

    return (
        <div className="InsectCard card">
            <div className="card-body">
                <h6 className="card-title">
                    {species}
                    {url_image && <img src={url_image} alt={species} className="float-right ml-5" />}
                </h6>
                <h3>${price}</h3>
                {!isCheckoutRoute && <button onClick={handleAddClick}>Add to Cart</button>}
                {isCheckoutRoute && <button onClick={handleRemoveClick}>Remove</button>}
            </div>
        </div>
    );
}

export default InsectCard;
