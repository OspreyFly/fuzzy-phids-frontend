import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import FuzzyApi from "../api/FuzzyApi";
import InsectCard from "./InsectCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./InsectList.css";

/** Show page with list of insects.
 *
 * On mount, loads insects from API.
 * Re-loads filtered insects on submit from search form.
 *
 * This is routed to at /insects
 *
 * Routes -> { InsectCard, SearchForm }
 */

function InsectList({ cart, getSummary, addToCart, removeFromCart }) {
    const [insects, setInsects] = useState(null);
    // Search and pass on most recent cart and shopping mode state on init
    useEffect(() => {
        search();
    }, []);

    async function search(term) {
        let insects = await FuzzyApi.getAllInsects();
        if (term) {
            insects = insects.filter(insect => insect.species.toLowerCase().includes(term.toLowerCase()));
        }
        setInsects(insects);
    }





    if (!insects) return <LoadingSpinner />;

    return (
        <div className="col-md-8 offset-md-2">
            <div className="summary">
                <SearchForm searchFor={search} />
                {getSummary()}
                <br />
            </div>

            {insects.length
                ? (
                    <div className="Insect-list">
                        {insects.map(c => (
                            <InsectCard
                                key={c.id}
                                id={c.id}
                                species={c.species}
                                price={c.price}
                                url_image={c.url_image}
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default InsectList;