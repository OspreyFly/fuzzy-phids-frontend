import React, { useEffect, useState } from 'react';
import FuzzyApi from '../api/FuzzyApi';

function ProfileDashboard() {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserProfileAndOrders = async () => {
            // Assuming getCurrentUser returns the user's profile
            const currentUser = await FuzzyApi.getCurrentUser();
            if (currentUser) {
                setProfile(currentUser);
                // Now that we have the user's ID, fetch their orders
                const userOrders = await FuzzyApi.getAllOrders(currentUser.id);
                setOrders(userOrders);
            }
        };

        fetchUserProfileAndOrders();
    }, []); // No dependencies, so this effect runs once on mount

    if (!profile || !orders.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Phone Number: {profile.phone}</p>
            <h2>Your Past Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.user_order_id}>
                        <strong>Order ID:</strong> {order.user_order_id}<br />
                        <strong>Submited:</strong> {order.submit_time}<br />
                        <strong>Total:</strong> ${order.total.toFixed(2)}
                        {/* Include other order details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileDashboard;
