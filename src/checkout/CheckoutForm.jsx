import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import FuzzyApi from '../api/FuzzyApi';
import './CheckoutForm.css';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cart, setCart }) => {
    const { currentUser } = useContext(UserContext);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: '',
        delivery_address: '',
        items: cart,
        user_order_id: currentUser.id
    });
    const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);

    useEffect(() => {
        // Calculate the total after the component has mounted
        const total = getTotal();
        setFormData(prevFormData => ({
            ...prevFormData,
            total: total,
        }));
    }, [cart]);

    function getTotal() {
        let total = 0;
        for (let item of cart) {
            total += +item.price;
        }
        return total;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation here
        if (isValid(formData)) {
            try {
                const res = await FuzzyApi.getAllOrders(formData.phone, formData.delivery_address);
                for (let order of res) {
                    if (JSON.stringify(order.items) === JSON.stringify(cart)) {
                        // Found a matching order
                        setShowDuplicatePopup(true);
                        break; // Exit the loop since we found a match
                    }
                }
            } catch (e) {
                console.error(e);
                setShowSuccessPopup(true);
                setPopupMessage('Something went wrong back there! Please try again later.');
            }

            // Add confirmation prompt
            if (!showDuplicatePopup) {
                const isConfirmed = window.confirm('Are you sure you want to submit this order?');

                if (isConfirmed) {
                    try {
                        console.log('Form is valid, proceed with submission.');
                        const res = await FuzzyApi.createOrder({ ...formData });
                        setShowSuccessPopup(true);
                        alert('Your order was submitted successfully!');
                        setCart([]);
                        navigate('/insects'); // Navigate to /insects
                    } catch (e) {
                        console.error(e);
                        setShowSuccessPopup(true);
                        setPopupMessage('An error occurred while submitting your order. Please try again.');
                    }
                } else {
                    // Cancel the submission if user doesn't confirm
                    console.log('Submission cancelled by user');
                }
            }
        } else {
            console.error('Form validation failed.');
        }
    };


    const isValid = (data) => {
        if (data.phone && data.delivery_address) {
            return true;
        }
    };

    const handleDuplicateOrder = () => {
        setShowDuplicatePopup(false);
        handleSubmit();
    };

    return (
        <>
            <form className="checkout-form" onSubmit={handleSubmit}>
                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input className="checkout-form"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        minLength="1"
                        maxLength="30"
                        required
                    />
                </div>

                {/* Delivery Address */}
                <div>
                    <label htmlFor="delivery_address">Delivery Address:</label>
                    <input
                        type="text"
                        id="delivery_address"
                        name="delivery_address"
                        value={formData.delivery_address}
                        onChange={handleChange}
                        minLength="1"
                        maxLength="10"
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {showSuccessPopup && (
                <div className="success-popup">
                    <p>{popupMessage}</p>
                    <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                </div>
            )}

            {showDuplicatePopup && (
                <div className="duplicate-order-popup">
                    <p>Are you sure you want to submit another order?</p>
                    <button onClick={handleDuplicateOrder}>Yes</button>
                    <button onClick={() => setShowDuplicatePopup(false)}>No</button>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
