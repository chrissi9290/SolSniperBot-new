const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateWallet } = require('../utils/wallet');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({ success: false, message: 'E-Mail bereits registriert' });

        const wallet = generateWallet();
        const newUser = new User({ name, email, password, walletAddress: wallet.publicKey });
        await newUser.save();

        res.json({ success: true, message: 'Benutzer erfolgreich registriert', wallet: wallet.publicKey });
    } catch (err) {
        res.json({ success: false, message: 'Fehler bei der Registrierung' });
    }
});

module.exports = router;
