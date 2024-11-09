import React from "react";

export default function Navbar({ onFormChange }) {
    return (
        <div id="nav">
            <h1>CryptoConomy</h1>
            <a href="../pages/Home.jsx">Home</a>
            <a href="../pages/About.jsx">About Us</a>
            <a href="#" onClick={() => onFormChange("login")}>Login</a>
            <a href="#" onClick={() => onFormChange("signup")}>Sign Up</a>
        </div>
    );
}
