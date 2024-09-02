import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ currentUser, logout }) {
    const navigate = useNavigate();

    function handleHomeClick() {
        navigate('/', { replace: true, state: { forceReload: true } });
    }

    function loggedInNav() {
        return (
            <>
                <li>
                    <NavLink to="/insects">
                        Browse
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/checkout">
                        Check-Out
                    </NavLink>
                </li>
                <li>
                    <Link to="/" onClick={logout}>
                        Log out {currentUser ? "" : currentUser.username}
                    </Link>
                </li>
            </>
        );
    }

    function loggedOutNav() {
        return (
            <>
                <li>
                    <NavLink to="/insects">
                        Browse
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/checkout">
                        Check-Out
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
            </>
        );
    }

    return (
        <div>
            <h1 id="title">Sid's Fuzzy Phids</h1>
            <nav id="nav-container">
                <ul id="nav-list">
                    <li onClick={handleHomeClick}>Home</li>
                    {currentUser.id !== -1 ? loggedInNav() : loggedOutNav()}
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;