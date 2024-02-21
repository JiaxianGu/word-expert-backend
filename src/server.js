const express = require('express');
const knex = require('../knex');
const app = express();
const cors = require('cors');
const TABLE_NAME = 'users';

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
        response = await knex.select({id: 'id', userName: 'user_name', password: 'password'}).from('users');
        res.status(200).send(response);
    });

    app.post("/word", async(req, res) => {
        // in req.body:
        // {
        //     "word": "example",
        // }
        try {
            let wordToSearch = req.body.word;
            const fetchResult = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`);
            const parsedResult = await fetchResult.json();
            const wordInfo = parsedResult[0];
            res.status(200).send(wordInfo);
        } catch(err) {
            console.error(err.message);
        }
    })

    app.post("/signup", async(req, res) => {
        // in req.body:
        // {
        //     "userName": "user_name",
        //     "plainPassword": "plain_password"
        // }
        try {
            let { userName, plainPassword } = req.body;
            console.log(userName);
            console.log(plainPassword);
            const existingUsername = await knex(TABLE_NAME).select('*').where('user_name', userName);
            if (existingUsername.length === 0) {
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(plainPassword, salt);
                console.log(hashedPassword);
                await knex(TABLE_NAME)
                    .insert({
                        user_name: userName,
                        password: hashedPassword
                    });
                res.status(200).send('signup success!');
            } else {
                res.status(409).send('Username already taken.');
            }
            
        } catch(err) {
            console.error(err.message);
        }
    })


    return app;
}



module.exports = {setupServer};