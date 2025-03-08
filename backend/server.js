// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Beispielroute für Testzwecke
app.get('/', (req, res) => {
    res.send('Meme Coin Sniper Bot Backend läuft!');
});

// Benutzer-Routen hinzufügen
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
