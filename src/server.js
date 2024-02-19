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
        response = knex.select({id: 'id', userName: 'user_name'}).from('users');
        res.status(200).send(response);
    });


    return app;
}



module.exports = {setupServer};