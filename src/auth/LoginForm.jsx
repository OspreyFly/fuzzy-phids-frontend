import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FuzzyApi from "../api/FuzzyApi";
import "./auth.css";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /insects route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirects to /insects.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormErrors([]);
        try {
            const result = await FuzzyApi.getCurrentUser(formData.username);
            console.log(result);
            if (!result) return;
        } catch (e) {
            setFormErrors([...formErrors, `User Doesn't Exist: ${formData.username}`]);
            return;
        }
        try {
            const result = await login(formData);
            if (result.success) {
                navigate("/insects");
            } else {
                console.log(result);
                setFormErrors([{ message: "INVALID USERNAME / PASSWORD" }]);
            }
        } catch (error) {
            setFormErrors([{ message: "INVALID USERNAME / PASSWORD" }]);
        }
    }


    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Log In</h2>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username:</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                            <button
                                className="btn btn-primary float-right"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;