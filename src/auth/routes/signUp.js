"use strict";
const express = require("express");
const { Users } = require("../models/index-model");
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const signUpRouter = express.Router();

signUpRouter.get("/users", getUsers);
async function getUsers(req, res) {
  const getUsers = await Users.findAll();
  res.status(200).json(getUsers);
}

signUpRouter.post("/signup", signUp);
async function signUp(req, res) {
  try {
    let username = req.body.username;
    let validUserName = await Users.findOne({
      where: { username: username }
    });
    if (validUserName) {
      res.status(500).send("username should be unique");
    } else {
      let password = await bcrypt.hash(req.body.password, 10);
      const record = await Users.create({
        username: username,
        password: password,
      })
      res.status(201).json(record);
    }
  } catch (e) {throw new Error('Error Creating User')}
  
  //or:
  // try {
  //   req.body.password = await bcrypt.hash(req.body.password, 10);
  //   const record = await Users.create(req.body);
  //   res.status(200).json(record);

  // } catch (e) { res.status(403).send('Error Creating User')}
};

module.exports = signUpRouter;