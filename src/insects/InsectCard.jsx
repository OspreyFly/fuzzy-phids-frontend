import React, { useEffect, useState } from "react";
import "./InsectCard.css";

/** Show limited information about an insect
 *
 * Is rendered by InsectList to show a "card" for each insect.
 *
 * InsectList -> InsectCard
 */
const InsectCard = ({ id, species, price, url_image, cart, addToCart, removeFromCart }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Check if the insectId exists in the cart
        const insectInCart = cart.some(item => item.id === id);

        // Set isDisabled to true if the insect is in the cart
        if (insectInCart) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [cart, id]); // Re-run the check whenever the cart or insectId changes

    const handleAddClick = () => {
        if (!isDisabled) {
            setIsDisabled(true);
            addToCart({ id, species, price, url_image });
        }
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
                {!isDisabled && <button className="animated-plus-button" onClick={handleAddClick}>+</button>}
                {isDisabled && <button className="animated-minus-button" onClick={handleRemoveClick}>-</button>}
            </div>
        </div>
    );
}

export default InsectCard;
