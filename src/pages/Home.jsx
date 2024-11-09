import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Login from "../Login";
import SignUp from "../SignUp"; // Make sure to import the SignUp component
import Landing from "../components/Landing";
import UserDashboard from "../components/UserDashboard";
import Footer from "../components/Footer";

function Home() {
    const [formType, setFormType] = useState("login"); // Default to login form
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
    const [userName, setUserName] = useState(""); // State to store the logged-in user's name

    const handleFormChange = (type) => {
        setFormType(type);
        //This function sets the type of form to login/sign out
    };

    const handleLoginSuccess = (userName) => {
        setIsLoggedIn(true); // Update state to logged in
        setUserName(userName); // Set the user's name
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Update state to logged out
        setUserName(""); // Clear the user's name
        setFormType("login"); // Optionally reset form to login
    };

    return (
        <div>
            <Navbar onFormChange={handleFormChange} />
            <div className="container">
                <div className="homeContainer">
                    {!isLoggedIn ? ( // Show login/sign up if not logged in
                        <>
                            {formType === "login" ? <Login onLoginSuccess={handleLoginSuccess} /> : <SignUp />}
                        </>
                    ) : (
                        <UserDashboard userName={userName} onLogout={handleLogout} /> // Show dashboard if logged in
                    )}
                </div>
                <Landing />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
