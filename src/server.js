const express = require('express');
const knex = require('../knex');
const app = express();
const cors = require('cors');

// Security / BCrypt 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');

// Controllers
// const usersController = require('./users.controller.js');
// const { validateNewUser, validateExisitingUser } = require('./util/validation.js');

const setupServer = () => {
    app.use(express.json());
    app.use(cors());


    app.get("/", (req, res) => {
        res.status(200).send("I am up and running!");
    });


    return app;
}



module.exports = {setupServer};