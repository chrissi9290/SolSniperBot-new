// userRoutes.js
const express = require('express');
const router = express.Router();

// Beispiel: Alle Benutzer abrufen (Admin-Bereich)
router.get('/', (req, res) => {
    res.json({ message: 'Alle Benutzer auflisten' });
});

// Beispiel: Benutzer erstellen (Registrierung)
router.post('/register', (req, res) => {
    const { username, email } = req.body;
    res.json({ message: `Benutzer ${username} registriert!` });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { createWallet } = require('../services/walletService');

// Beispiel: Alle Benutzer abrufen (Admin-Bereich)
router.get('/', (req, res) => {
    res.json({ message: 'Alle Benutzer auflisten' });
});

// Beispiel: Benutzer erstellen (Registrierung)
router.post('/register', (req, res) => {
    const { username, email } = req.body;
    res.json({ message: `Benutzer ${username} registriert!` });
});

// Wallet erstellen (Solana)
router.post('/create-wallet', (req, res) => {
    const wallet = createWallet();
    res.json({ wallet });
});

module.exports = router;
