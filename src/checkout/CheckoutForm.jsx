import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import FuzzyApi from '../api/FuzzyApi';
import './CheckoutForm.css';

const CheckoutForm = ({ cart, setCart }) => {
    const { currentUser } = useContext(UserContext);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [formData, setFormData] = useState({
        phone: '',
        delivery_address: '',
        items: cart,
        user_order_id: currentUser.id
    });

    useEffect(() => {
        // Calculate the total after the component has mounted
        const total = getTotal();
        setFormData(prevFormData => ({
            ...prevFormData,
            total: total,
        }));
    }, [cart]); // Empty dependency array means this effect runs once after mounting

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
                console.log('Form is valid, proceed with submission.');
                const res = await FuzzyApi.createOrder({ ...formData });
                setShowSuccessPopup(true);
                setPopupMessage('Your order was submitted successfully!');
                setCart([]);
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
        if (data.phone && data.delivery_address) {
            return true;
        }


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
        </>
    );
};

export default CheckoutForm;
