require("dotenv").config({ path: "./.env" });

const DB_USER = "gujiaxian";
const DB_NAME = "word_expert_db";
const DB_HOST = "127.0.0.1";
const DB_PORT = "5432";
const DB_URL = process.env.DB_URL
const DB_PASSWORD = process.env.DB_PASSWORD;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: DB_URL || {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  }

};
