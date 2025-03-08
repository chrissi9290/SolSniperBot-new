// backend/server.js
const express = require('express');
const axios = require('axios');
const { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } = require('@solana/web3.js');

const app = express();
const port = 3000;

const connection = new Connection(clusterApiUrl('mainnet-beta'));

// Beispiel-API-Endpunkt für Auto-Sniping
app.get('/snipe', async (req, res) => {
    const tokenAddress = req.query.token;
    const slippage = req.query.slippage || 1;
    
    console.log(`Sniping Token: ${tokenAddress} mit Slippage: ${slippage}%`);

    try {
        // Beispiel für den Abruf von Raydium Liquiditätspool-Daten
        const raydiumData = await axios.get(`https://api.raydium.io/pairs?token=${tokenAddress}`);
        
        if (raydiumData.data && raydiumData.data.length > 0) {
            const poolInfo = raydiumData.data[0];
            console.log("Raydium Pool gefunden:", poolInfo);
            
            // Beispiel für Transaktion (Kauf-Logik kann hier hinzugefügt werden)
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey("SENDER_PUBLIC_KEY"),
                    toPubkey: new PublicKey(tokenAddress),
                    lamports: 1000, // Beispielbetrag
                })
            );

            res.send(`Sniping erfolgreich für Token: ${tokenAddress}`);
        } else {
            res.send(`Kein Liquiditätspool für Token: ${tokenAddress} gefunden`);
        }
    } catch (error) {
        console.error("Fehler beim Sniping:", error);
        res.status(500).send("Fehler beim Sniping-Vorgang");
    }
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});