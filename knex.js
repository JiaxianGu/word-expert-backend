require("dotenv").config({ path: "./.env" });
const config = require('./knexfile');
const knex = require('knex');

if (process.env.NODE_ENV === "development") {
    module.exports = knex(config.development);
} else if (process.env.NODE_ENV === "production") {
    module.exports = knex(config.production);
}