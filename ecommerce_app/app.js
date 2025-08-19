const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();


const authUrl = require('./routes/auth');
const productUrl = require('./routes/product');

const app = express();
app.use(express.json());

// DB connection
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database is connected"))
.catch((err) => console.error("Database is not connecting", err));


// Register routes
app.use('/auth', authUrl);
app.use('/product', productUrl);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

module.exports = app;