import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";  // Import the signup service

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        try {
            const resp = await signup(email, password);  // Use the signup function
            if (resp) {
                console.log("Signup successful");
                navigate("/login");
            } else {
                console.log("Signup failed");
                alert("Signup failed. User may already exist.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Signup</h1>

            <div className="d-flex flex-column gap-3 w-25 mx-auto">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    className="btn btn-primary w-50 mx-auto mt-3"
                    onClick={handleClick}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing up..." : "Signup"}
                </button>
            </div>
        </div>
    );
};
