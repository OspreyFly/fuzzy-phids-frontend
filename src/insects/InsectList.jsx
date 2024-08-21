import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import FuzzyApi from "../api/FuzzyApi";
import InsectCard from "./InsectCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of insects.
 *
 * On mount, loads insects from API.
 * Re-loads filtered insects on submit from search form.
 *
 * This is routed to at /insects
 *
 * Routes -> { InsectCard, SearchForm }
 */

function InsectList(props) {
    const [insects, setInsects] = useState(null);
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
        <div className="Insect-list col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {insects.length
                ? (
                    <div className="Insect-list">
                        {insects.map(c => (
                            <InsectCard
                                key={c.id}
                                species={c.species}
                                price={c.price}
                                url_image={c.url_image}
                                addToCart={props.addToCart}
                                getShoppingMode={props.getShoppingMode}
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