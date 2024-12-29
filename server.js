const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes/instaProfiles');

app.use(loggingActivity);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', (error) => console.error('error'));
db.once('open', () => console.log('Connected to database'));

app.use('/api', router);

app.get('/', (req, res) => {

    res.send('<h1>Instagram profiles App</h1>');
});

function loggingActivity(req, res, next) {

    console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
    next();
}

app.listen(PORT, () => console.log(`Server connected by port: ${PORT}`));