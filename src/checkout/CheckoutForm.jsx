import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import FuzzyApi from '../api/FuzzyApi';

const CheckoutForm = () => {
    const [currentUser] = useContext(UserContext);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [formData, setFormData] = useState({
        phone: '',
        delivery_address: '',
        submit_time: '',
        total: total,
        items: shopCart,
        user_order_id: currentUser.id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation here
        if (isValid(formData)) {
            try {
                console.log('Form is valid, proceed with submission.');
                let new_order = await FuzzyApi.createOrder({ formData });
                setShowSuccessPopup(true);
                setPopupMessage('Your order was submitted successfully!');
            } catch (e) {
                console.error(e);
                setShowSuccessPopup(true);
                setPopupMessage('Your order was not submitted!');
            }

        } else {
            console.error('Form validation failed.');
        }
    };

    const isValid = (data) => {
        // Implement validation logic here
        // For simplicity, this example only checks if strings are not empty
        return (
            data.phone &&
            data.delivery_address &&
            data.submit_time &&
            data.total >= 0 &&
            data.items &&
            data.user_order_id >= 0
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
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
        </>
    );
};

export default CheckoutForm;
