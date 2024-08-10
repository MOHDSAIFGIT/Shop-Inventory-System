const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
const itemsRoute = require('./routes/items');
const billsRoute = require('./routes/bills');

app.use('/items', itemsRoute);
app.use('/bills', billsRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Shop Inventory System API!');
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
