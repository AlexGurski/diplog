const express = require('express');
const bodyParser = require( 'body-parser' );

const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

app.get('/',(req, res) => {
  res.render('index.ejs');
})

app.get('/menu',(req, res) => {

  res.render('menu.ejs');
})

app.get('/allMenu', (req,res) =>{
  res.send(require("./public/json/allMenu.js"));
})

app.get('/menuWith', (req,res) =>{
  res.send(require("./public/json/menuWith.js"));
})
 app.listen(process.env.PORT || 3000, () => {
      console.log('--// PARK AVENJU start 3000 --//');
  })﻿;
