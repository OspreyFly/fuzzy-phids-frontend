import React from 'react';

function InsectRemoveButton({ handleRemoveFromCart, id }) {
    return (
        <button onClick={() => handleRemoveFromCart(id)} className="remove-button">
            Remove
        </button>
    );
}

export default InsectRemoveButton;
