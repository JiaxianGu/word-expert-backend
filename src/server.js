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

    app.post("/login", async(req, res) => {
        // in req.body:
        // {
        //     "userName": "user_name",
        //     "plainPassword": "plain_password"
        // }
        try {
            const { userName,plainPassword } = req.body;
            const rows = await knex(TABLE_NAME).select('*').where('user_name', userName);
            console.log(rows);
            if (rows.length > 0) {
                const hashedPassword = rows[0].password;
                bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error while comparing passwords");
                        return;
                    }
                    if (result) {
                        console.log("User Authenticated");
                        const objToReturn = {
                            userName: rows[0].user_name
                        }
                        res.status(200).send(objToReturn);
                    } else {
                        console.log("Incorrect Password");
                        res.status(401).send("Incorrect Password");
                    }
                });
            } else {
                console.log("User not found");
                res.status(404).send("User not found");
            }
        } catch(err) {
                console.error(err.message)
        }
    })

    app.post("/add", async(req, res) => {
        // in req.body:
        // {
        //     "word": "word",
        //     "meaning": "meaning",
        //     "user": "user_name"
        // }
        try {
            const { word, meaning, user } = req.body;
            const insertResponse = await knex('words').insert({'word': word, 'meaning': meaning, 'user': user})
            // console.log(insertResponse);
            res.status(200).send(insertResponse);
        } catch(err) {
            console.error(err.message);
        }
    })


    return app;
}



module.exports = {setupServer};