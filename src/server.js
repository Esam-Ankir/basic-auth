"use strict"; 
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");

const signInRouter=require('./auth/routes/signIn');
const signupRouter= require('./auth/routes/signUp');


app.get("/",(req,res) => {
    res.send("This is the home page");
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(signInRouter);
app.use(signupRouter);
app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};