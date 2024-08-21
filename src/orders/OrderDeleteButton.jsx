// OrderDeleteButton.jsx
import React from 'react';

const OrderDeleteButton = ({ orderId, onDelete }) => {
    const handleClick = async () => {
        // Accessing order details from the orderId prop
        // This assumes orderId contains enough information to identify the order uniquely
        // and that there's a way to retrieve the full order details, possibly via a global state or context
        const orderDetails = getOrder(orderId); // Implement this function based on your app's architecture

        const confirmMessage = `Are you sure you want to delete order with Total: $${orderDetails.total} and Delivery Address: ${orderDetails.delivery_address}?`;

        const confirmDeletion = window.confirm(confirmMessage);
        if (confirmDeletion) {
            try {
                const response = await fetch(`/orders/${orderId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                onDelete(); // Call the onDelete callback after successful deletion
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    return (
        <button onClick={handleClick}>Delete</button>
    );
};

export default OrderDeleteButton;
