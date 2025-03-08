// backend/server.js
const express = require('express');
const app = express();
const port = 3000;

// Beispiel-API-Endpunkt für Auto-Sniping
app.get('/snipe', (req, res) => {
    const tokenAddress = req.query.token;
    const slippage = req.query.slippage || 1;
    console.log(`Sniping Token: ${tokenAddress} mit Slippage: ${slippage}%`);
    res.send(`Sniping gestartet für Token: ${tokenAddress}`);
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
