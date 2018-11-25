const express = require('express');
const bodyParser = require( 'body-parser' );
require('babel-polyfill');
const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://alex:panik1993@ds239873.mlab.com:39873/heroku_4b2prwdg';
const dbName = 'heroku_4b2prwdg';

let service= require("./public/json/serviceJSON.js");

  const rez =   require("./public/modules/searchJS");
/*
let desert= require("./public/json/desert.js");
let menuPizza = require("./public/json/menuPizza.js");
let menuHot = require("./public/json/menuHot.js");
let menuCold = require("./public/json/menuCold.js");
let menuGarnirs= require("./public/json/garnirs.js");
let cocktail= require("./public/json/cocktail.js");
let pivo= require("./public/json/pivo.js");
let vodka= require("./public/json/vodka.js");
let tea= require("./public/json/tea.js");
let sokmorozh= require("./public/json/sokmorozh.js");
let supzavtrak= require("./public/json/supzavtrak.js");
let sandwblinch= require("./public/json/sandwblinch.js");
let salat= require("./public/json/salat.js");



let allMenuWith = menuPizza.concat(salat, sandwblinch, supzavtrak, menuHot,menuCold, menuGarnirs,cocktail,desert);
let allMenuWithout = pivo.concat(vodka,tea,sokmorozh);
*/

app.get('/allMenu', (req,res) =>{
  rez('menuIndex', {})
        .then((item) =>{
          //console.log(item)
         res.send (item);
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });

})

app.get('/menuWith', (req,res) =>{
  rez('menuWith', {})
        .then((items) =>{
         res.send (items);
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });
})

app.get('/menuWithout', (req,res) =>{
  rez('menuWithout', {})
        .then((items) =>{
         res.send (items);
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });
})

app.get('/service/:id', (req,res) => {
     let id = req.params.id;
     let push = [];
     for (let i=0;i<service.length;i++){
       if (req.params.id ===service[i].id) {
         push = service[i]
       }
     }
     console.log(push)
     res.render('oneService.ejs',{post:push});
   })

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

 app.listen(process.env.PORT || 3000, () => {
      console.log('--// PARK AVENJU start 3000 --//');
  })﻿;
