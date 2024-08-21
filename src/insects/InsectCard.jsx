import React from "react";
import { useLocation } from "react-router-dom";
import "./InsectCard.css";

/** Show limited information about an insect
 *
 * Is rendered by InsectList to show a "card" for each insect.
 *
 * InsectList -> InsectCard
 */
function InsectCard(props) {
    const location = useLocation();
    const isCheckoutRoute = location.pathname === '/checkout';

    return (
        <div className="InsectCard card">
            <div className="card-body">
                <h6 className="card-title">
                    {props.species}
                    {props.url_image && <img src={props.url_image} alt={props.species} className="float-right ml-5" />}
                </h6>
                <h3>${props.price}</h3>
                {!isCheckoutRoute && <button onClick={props.addToCart(props.id, props.species, props.price, props.url_image)}>Add to Cart</button>}
            </div>
        </div>
    );
}

export default InsectCard;
