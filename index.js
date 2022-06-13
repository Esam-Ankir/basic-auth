"use strict";
require("dotenv").config();
let PORT = process.env.PORT || 3000;
const server = require("./src/server");

const { db } = require("./src/auth/models/index-model");

db.sync()
    .then(() => {
        server.start(PORT);
    })
    .catch(console.error);