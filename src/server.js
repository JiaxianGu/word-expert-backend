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


    app.get("/", async (req, res) => {
        response = await knex.select({id: 'id', userName: 'user_name'}).from('users');
        res.status(200).send(response);
    });

    app.post("/search", async(req, res) => {
        // in req.body:
        // {
        //     "word": "example",
        // }
        try {
            let wordToSearch = req.body.word;
            console.log(typeof wordToSearch);
            const fetchResult = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`);
            const parsedResult = await fetchResult.json();
            res.status(200).send(parsedResult);

        } catch(err) {
            console.error(err.message);
        }
    })


    return app;
}



module.exports = {setupServer};