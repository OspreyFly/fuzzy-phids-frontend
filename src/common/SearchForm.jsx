import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on InsectList and OrderList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { InsectList, OrderList } -> SearchForm
 */

function SearchForm({ searchFor }) {

    const [searchTerm, setSearchTerm] = useState("");

    /** Update local state with input */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    /** Tell parent to filter */
    function handleSubmit(evt) {
        // Prevent default form submission behavior
        evt.preventDefault();


        // Trim the search term and call the search function
        const trimmedSearchTerm = searchTerm.trim();

        if (!trimmedSearchTerm || trimmedSearchTerm === '') {
            searchFor();
        }
        if (trimmedSearchTerm) {
            searchFor(trimmedSearchTerm);
        }
    }

    function handleFilterClear() {
        setSearchTerm("");
        searchFor();
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handleChange} // Handle input change separately
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
                <button type="button" onClick={handleFilterClear} className="btn btn-lg">
                    Clear Filters
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
