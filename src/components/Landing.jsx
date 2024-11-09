import React, { useEffect, useState } from "react";

const Landing = () => {
    const [cryptos, setCryptos] = useState([]); // State to hold the cryptocurrency data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [serverTime, setServerTime] = useState(""); // State to hold the server time

    // Function to fetch data from the CoinGecko API
    const fetchCryptos = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCryptos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Set up the effect to fetch cryptocurrencies and update server time
    useEffect(() => {
        fetchCryptos(); // Initial fetch on mount

        // Set up an interval to update the server time every second
        const timeIntervalId = setInterval(() => {
            const date = new Date();
            setServerTime(date.toLocaleTimeString()); // Update server time
        }, 1000);

        // Set up an interval to fetch cryptocurrency data every 100 seconds
        const cryptoIntervalId = setInterval(fetchCryptos, 100000); // 100000 ms = 100 seconds

        return () => {
            clearInterval(timeIntervalId); // Clean up the time interval on component unmount
            clearInterval(cryptoIntervalId); // Clean up the crypto fetch interval on component unmount
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Render loading, error, or crypto data
    if (loading) return <div className="loading"></div>; // Show loading circle when fetching data

    // If there's an error, return an empty container
    if (error) {
        return (
            <div className="landContainer">
                <h1>News</h1>
                <h2>Top Cryptocurrencies</h2>
                <h3>Server Time: {serverTime}</h3>
                <p>There was an issue fetching the data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="landContainer">
            <h1>News</h1>
            <h2>Top Cryptocurrencies</h2>
            <h3>Server Time: {serverTime}</h3> {/* Display server time */}
            <ul>
                {cryptos.map(crypto => {
                    const priceChange = crypto.price_change_percentage_24h;
                    const arrow = priceChange > 0 ? '↑' : priceChange < 0 ? '↓' : ''; // Arrow based on price change
                    const priceColor = priceChange > 0 ? 'green' : priceChange < 0 ? 'red' : 'black'; // Color based on price change

                    return (
                        <li key={crypto.id} style={{ color: priceColor }}>
                            <strong>{crypto.name}</strong> ({crypto.symbol.toUpperCase()}): ${crypto.current_price.toFixed(2)} {arrow}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Landing;
