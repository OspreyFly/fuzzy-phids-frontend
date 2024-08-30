import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FuzzyApi from "../api/FuzzyApi";
import "./auth.css";
/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /** Handle form submit:
     *
     * Calls signup func prop and, if successful, redirects to /insects.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormErrors([]);

        if (!formData.username) {
            setFormErrors(["Username must be 1-30 Characters long!"]);
            return;
        }
        if (formData.password.length < 5) {
            setFormErrors([...formErrors, "Password must be at least 5 characters in length!"]);
            return;
        }
        if (!validateEmail(formData.email)) {
            setFormErrors([...formErrors, "Email must match expected format: sample@sample.com"]);
            return;
        }
        try {
            const result = await signup(formData);
            if (result.success) {
                navigate("/insects");
            } else {
                setFormErrors([...formErrors, "That account already exists or there has been a backend error."]);
            }
        } catch (e) {
            console.warn(e);
        }
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
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

export default SignupForm;