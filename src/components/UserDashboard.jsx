import React, { useState, useEffect } from "react";

function UserDashboard({ userName, onLogout }) { // Accept userName as a prop
    const [balances, setBalances] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetch("http://localhost:3001/balances");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setBalances(data);
            } catch (err) {
                console.error("Error fetching balances:", err);
                setError("Unable to fetch balances. Please try again later.");
            }
        };

        fetchBalances();
    }, []);

    return (
        <div className="dashboardContainer">
            <h2>User Dashboard</h2>
            <p>Welcome, {userName}!</p> {/* Display the logged-in user's name */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={onLogout} className="logoutButton">Logout</button>
            <div className="balanceTable">
                <table>
                    <thead>
                        <tr>
                            <th>Cryptocurrency</th>
                            <th>Balance</th>
                            <th>Value in USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map((crypto) => (
                            <tr key={crypto.id}>
                                <td>{crypto.name}</td>
                                <td>{crypto.amount} {crypto.symbol}</td>
                                <td>${crypto.usdValue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDashboard;
