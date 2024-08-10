const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohdsaif:mohdsaif@cluster0.erjgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
