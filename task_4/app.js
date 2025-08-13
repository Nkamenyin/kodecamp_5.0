const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwb = require('jsonwebtoken')

const app = express();

app.use(express.json());

app.get("/ping", (req, res, next) => {
    res.send("Pong");
});

app.listen(3000, () => {
    console.log("Sever is running on http://localhost:3000");
});