import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import Shopping from "../checkout/Shopping";
import OrderList from "../orders/OrderList";
import LoginForm from "../auth/LoginForm";
import ProfileDashboard from "../profiles/ProfileDashboard";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function AllRoutes({ login, signup }) {

    return (
        <div className="pt-5">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/insects" element={<Shopping />} />
                <Route path="/checkout" element={<Shopping />} />
                <Route path="/orders" element={<PrivateRoute component={<OrderList />} />} />
                <Route path="/profile" element={<PrivateRoute component={<ProfileDashboard />} />} />
                <Route element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default AllRoutes;

