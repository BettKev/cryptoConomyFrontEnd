import React, { useState } from "react";

function SignUp() {
    // State for form fields and error message
    const [username, setUsername] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setSuccess(""); // Reset success message

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Fetch existing users
            const response = await fetch("http://localhost:3001/users");
            const users = await response.json();

            // Check if the email already exists
            const userExists = users.some(user => user.useremail === useremail);

            if (userExists) {
                setError("A user with this email already exists.");
            } else {
                // Add new user to the database
                const newUser = { username, useremail, password };
                await fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser)
                });
                setSuccess("Sign up successful!");
                setUsername("");
                setUserEmail("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("There was an error with the sign-up process. Please try again.");
        }
    };

    return (
        <div className="signupForm">
            <form onSubmit={handleSignUp}>
                <p>Enter your details to sign up.</p>

                {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
                {success && <p style={{ color: "green" }}>{success}</p>} {/* Display success message */}

                <label htmlFor="username"></label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Jane Doe" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label htmlFor="useremail"></label>
                <input 
                    type="email" 
                    id="useremail" 
                    placeholder="janedoe@example.email.com" 
                    value={useremail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                    required 
                />

                <label htmlFor="password"></label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Create a password!" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label htmlFor="confirmPassword"></label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm your password!" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
