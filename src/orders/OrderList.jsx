import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import FuzzyApi from "../api/FuzzyApi";
import OrderDeleteButton from "./OrderDeleteButton";
import LoadingSpinner from "../common/LoadingSpinner";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [isExpanded, setIsExpanded] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await FuzzyApi.getAllOrders();
            setOrders(orders);
        };
        fetchOrders();
    }, []);

    if (!orders.length) return <LoadingSpinner />;

    const handleExpandToggle = (orderId) => {
        setIsExpanded(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    return (
        <>
            <SearchForm searchFor={fetchOrders} />
            <div className="order-list">
                {orders.map((order) => (
                    <div key={order.id} className={`order-item ${isExpanded[order.id] ? 'expanded' : ''}`} onClick={() => handleExpandToggle(order.id)}>
                        <span>ID: {order.id}</span>
                        <span>Submit Time: {order.submit_time}</span>
                        <span>Total: ${order.total.toFixed(2)}</span>
                        <OrderDeleteButton orderId={order.id} onDelete={() => handleDeleteOrder(order.id)} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default OrderList;
