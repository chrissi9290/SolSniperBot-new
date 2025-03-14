import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const App = () => {
    const [wallet, setWallet] = useState(null);

    const connectWallet = async () => {
        if ('solana' in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
                try {
                    const response = await provider.connect();
                    setWallet(response.publicKey.toString());
                } catch (err) {
                    console.error("Wallet connection failed", err);
                }
            }
        } else {
            alert("Phantom Wallet nicht gefunden!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold">Solana Sniper</h1>
            <button onClick={connectWallet} className="mt-4 px-6 py-2 bg-blue-500 rounded-lg">
                {wallet ? `Verbunden: ${wallet}` : "Verbinde Phantom Wallet"}
            </button>
        </div>
    );
};

export default App;