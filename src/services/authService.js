// /src/services/authService.js

const signup = async (email, password) => {
    try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return response.ok;  // Return true if the signup is successful
    } catch (error) {
        console.error("Error during signup:", error);
        return false; // Return false if an error occurs
    }
};

const forgotPassword = async (email) => {
    try {
        const resp = await fetch("/api/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return resp.ok;  // Return true if request is successful
    } catch (error) {
        console.error("Error resetting password:", error);
        return false; // Return false if an error occurs
    }
};

const forgotUsername = async (email) => {
    try {
        const resp = await fetch("/api/forgot-username", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return resp.ok;  // Return true if request is successful
    } catch (error) {
        console.error("Error recovering username:", error);
        return false; // Return false if an error occurs
    }
};

export { signup, forgotPassword, forgotUsername };
