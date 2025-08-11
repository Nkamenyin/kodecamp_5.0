const express = require('express');

const app = express();

app.use(express.json());

app.get("/ping", (req, res, next) => {
    res.send("Pong");
});

app.listen(3000, () => {
    console.log("Sever has started");
});