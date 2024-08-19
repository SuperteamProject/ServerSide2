const express = require("express");
const session = require('express-session');
const passport = require('./middleware/authPassport.js');
const { findAdminByEmail, checkPassword, findAdminById } = require('./model/adminModels.js');
const router = require("./router/index.js");
const path = require('path');

const knexfile = require('./knexfile');
const knex = require('knex')(knexfile.development);

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./openapi.json');

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Configuration
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



app.use(router);

function errorHandler(err, req, res, next) {
    console.log(err);
    console.log("errorHandle");
    let messageReturn = "";
    let errorStatus;
    if (err.code === 400) {
        messageReturn = "Bad request";
        errorStatus = 400;
    } else if (err.code === 404) {
        messageReturn = "Not Found";
        errorStatus = 404;
    } else if (err.code === 500) {
        messageReturn = "Internal Server Error";
        errorStatus = 500;
    }
    res.status(errorStatus).json({ "message": messageReturn });
}


app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerJson));



app.listen(PORT,"0.0.0.0",()=>{console.log("server harus nyala!");})

module.exports = app;