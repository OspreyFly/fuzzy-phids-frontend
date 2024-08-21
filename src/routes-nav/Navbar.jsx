import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    function loggedInNav() {
        return (
            <ul id="nav-list">
                <li>
                    <NavLink to="/insects">
                        Insects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders">
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/checkout">
                        Your Shopping Cart
                    </NavLink>
                </li>
                <li>
                    <Link to="/" onClick={logout}>
                        Log out {currentUser ? "" : currentUser.username}
                    </Link>
                </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul id="nav-list">
                <li>
                    <NavLink to="/insects">
                        Insects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <div>
            <h1>Sid's Fuzzy Phids</h1>
            <nav id="nav-container">
                <Link to="/">
                    Home
                </Link>
                {currentUser ? loggedInNav() : loggedOutNav()}
            </nav>
        </div>
    );
}

export default Navigation;