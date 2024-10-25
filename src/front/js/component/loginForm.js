// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";

// const LoginForm = () => {
//   const { store, actions } = useContext(Context); // Assuming you want to use this context
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Add your login logic here, e.g., calling actions.login(email, password)
//     // or making an API call.
//     console.log("Login attempted with:", email, password);
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <div className="form-group">
//         <input
//           type="email"
//           name="email"
//           className="form-control"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group mt-2">
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="d-flex justify-content-center mt-3">
//         <button type="submit" className="btn btn-custom">
//           Login
//         </button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useEffect } from "react";

const LoginForm = () => {
    const handleGoogleLogin = (response) => {
        console.log("Google ID Token: " + response.credential);

        // Send the ID token to your backend for verification
        fetch("/api/google-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: response.credential })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                console.log("Google Login successful");
                // Redirect or perform any action after successful login
            } else {
                console.log("Google Login failed");
                alert("Google login failed. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error during Google login:", error);
        });
    };

    // Initialize Google Sign-In
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
            callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large" } // Customize button appearance
        );
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Welcome to the App</h1>
            <div className="card mt-3" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <form id="loginForm">
                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">User Name</label>
                            <input type="user" className="form-control" id="user" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                    </form>
                    <div id="googleSignInButton" className="mt-3"></div> {/* Google button placeholder */}
                    <div className="text-center mt-3">
                        <p>or</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
