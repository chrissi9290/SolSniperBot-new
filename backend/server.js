const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();

mongoose.connect('mongodb://localhost:27017/solsniper', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/register', authRoutes);
app.use('/login', authRoutes);

app.listen(3000, () => console.log('Server läuft auf http://localhost:3000'));
