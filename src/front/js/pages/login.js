import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { login } from "../services/authService";  // Import the login service
import LoginForm from "../component/loginForm";

export const Login = () => {
    // const { store, actions } = useContext(Context);
    // const navigate = useNavigate();
  
    return (
      <div className="login-body d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-2 mb-5 bg-primary">
          <div className="card-body">
            <h1 className="text-center mb-4">Spot Me Login</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    );

    
};

