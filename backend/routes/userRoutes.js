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
