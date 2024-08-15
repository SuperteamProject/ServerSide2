// const { log } = require("console");
const express = require("express"); 
const app = express(); 
PORT = 5000;
const router = require("./router/index.js")
const path = require('path');

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public')) // untuk membaca file yang ada di folder public
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(router);


// app.listen(PORT,()=>{console.log("server harus nyala!");})
module.exports = app;