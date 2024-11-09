import React, { useState } from "react";

function Login({ onLoginSuccess }) { // Accept onLoginSuccess as a prop
    // State for form fields and error message
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error on each submit

        try {
            // Fetch users data from JSON server
            const response = await fetch("http://localhost:3001/users");
            const users = await response.json();

            // Find user by either username or email
            const user = users.find((user) => 
                (user.username === usernameOrEmail || user.useremail === usernameOrEmail)
            );

            // Verify if user exists and password matches
            if (user && user.password === password) {
                // Instead of alert, directly call onLoginSuccess
                onLoginSuccess(user.name); // Pass the user's name to the Home component
            } else {
                setError("Invalid username/email or password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("There was an error logging in. Please try again.");
        }
    };

    return (
        <div className="loginForm">
            <form onSubmit={handleLogin}>
                <p>Enter your username or email to login.</p>
                
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
                
                <label htmlFor="usernameOrEmail"></label>
                <input 
                    type="text" 
                    id="usernameOrEmail" 
                    placeholder="Username or Email" 
                    value={usernameOrEmail} 
                    onChange={(e) => setUsernameOrEmail(e.target.value)} 
                    required 
                />
                
                <label htmlFor="password"></label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password!" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
