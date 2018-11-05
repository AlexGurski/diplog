const express = require('express');
const bodyParser = require( 'body-parser' );

const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

let menuPizza = require("./public/json/menuPizza.js");
let menuHot = require("./public/json/menuHot.js");
let menuCold = require("./public/json/menuCold.js");
let menuGarnirs= require("./public/json/garnirs.js");
let milk= require("./public/json/milk.js");
let pivo= require("./public/json/pivo.js");

let allMenuWith = menuPizza.concat(menuHot,menuCold, menuGarnirs,milk);
let allMenuWithout = pivo
app.get('/',(req, res) => {
  res.render('index.ejs');
})

app.get('/menu',(req, res) => {
  res.render('menu.ejs');
})

app.get('/about',(req, res) => {
  res.render('about.ejs');
})

app.get('/service',(req, res) => {
  res.render('service.ejs');
})

app.get('/galery',(req, res) => {
  res.render('galery.ejs');
})

app.get('/allMenu', (req,res) =>{
  res.send(require("./public/json/allMenu.js"));
})

app.get('/menuWith', (req,res) =>{
  res.send(allMenuWith);
})

app.get('/menuWithout', (req,res) =>{
  res.send(allMenuWithout);
})
 app.listen(process.env.PORT || 3000, () => {
      console.log('--// PARK AVENJU start 3000 --//');
  })﻿;
