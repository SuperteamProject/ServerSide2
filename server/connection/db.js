// const {Pool} = require('pg'); 
const knex = require('knex');
const knexConfig = require('../knexfile');

// const db = new Pool({
//     // user: "postgres", 
//     // password: 'root',
//     // host: 'localhost',
//     // database: 'challenge-gold', 
//     // port: 5432
// })
const db = knex(knexConfig.development);
module.exports = db;