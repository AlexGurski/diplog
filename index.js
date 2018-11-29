const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
let Data = new Date();
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://alex:panik1993@ds239873.mlab.com:39873/heroku_4b2prwdg';
const dbName = 'heroku_4b2prwdg';
var massivZaskazov = {};
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

MongoClient.connect(url, (err, client) => {

assert.equal(null, err);
const db = client.db(dbName);
const collection =db.collection('order');
  app.post("/order", (req,res) => {
      req.body.timeOrder =  Data.getHours() + ':' + Data.getMinutes() + ':' + Data.getSeconds() + '. ' + Data.getDate() + ' '
        + monthNames[Data.getMonth()] +' '+ Data.getFullYear();
            collection.insertOne(req.body,(err,result)=>{
              console.log(req.body)
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }
                    delete   massivZaskazov[req.body.ip]
                      res.redirect('/order')
                  })
      })
});


app.get('/orderItems', (req,res) => {
          res.send(massivZaskazov);
        })

app.post("/submitMenu", (req,res) => {
  let   massiv = typeof massivZaskazov[req.body.ip] === "undefined" ? [] : massivZaskazov[req.body.ip];
  console.log('--POST MENU--');
    for (let i = 0; i < massiv.length;i++){
      if (massiv[i]._id.substr(0,14) === req.body._id.substr(0,14)){
      massiv.splice(i,1);
    }
  }
    massiv.push(req.body);
    console.log(req.body.ip)
    massivZaskazov[req.body.ip] = massiv;
    massiv = [];

  res.send("ACCEPT");
});

app.post("/submitMenuDelete", (req,res) => {
        let  massiv = typeof massivZaskazov[req.body.ip] == "undefined" ? [] : massivZaskazov[req.body.ip];
      for (let i = 0; i < massiv.length;i++){
        if (massiv[i]._id.substr(0,14) === req.body._id.substr(0,14)){
        massiv.splice(i,1);
        }
      }

      res.send(null);
      massivZaskazov[req.body.ip] = massiv;
      massiv = [];
});


app.get('/allMenu', (req,res) =>{
  rez('menuIndex', {})
        .then((item) =>{
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
app.get('/order',(req, res) => {
  res.render('order.ejs');
})

app.get('/about',(req, res) => {
  res.render('about.ejs');
})

app.get('/service',(req, res) => {
  res.render('service.ejs');
})

app.get('/admin/armor/:id', (req,res) => {

              rez('armor', {_id:req.params.id})
                  .then((item) =>{
                     res.render('armorSolo.ejs',{post:item});

                   })
                     .catch((errorMessage)=>{
                       console.log(errorMessage);
                  });
            })

app.get('/admin', (req,res) => {
  rez('order', {})
  .then((items) =>{ //console.log(items);
     res.render ('admin.ejs', {post:items});})
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
    })

    MongoClient.connect(url, (err, client) => {
                assert.equal(null, err);
                const db = client.db(dbName);
                const collection =db.collection('menu');
                  app.post("/admin", (req,res) => {
                        console.log(req.body)
                           collection.update(
                               {_id: String(req.body.name) },
                               {name: req.body.name,
                                discription:req.body.discription,
                                kind:req.body.kind,
                                price:req.body.price,
                                gram:req.body.weight
                               }
                               ,{ upsert: true },
                               function(err, result){
                                 console.log(err);
                               }

                           );
                            res.redirect('/admin')

                       }) ;
                     })


    app.get('/adminOrder', (req,res) => {
    rez('order', {})
    .then((items) =>{
       res.send(items);})
       .catch((errorMessage)=>{
         console.log(errorMessage);
       });
      })

      app.get('/admin/:id', (req,res) => {
        rez('order', {_id:req.params.id})
            .then((items) =>{ //console.log(items);
               res.render('editFinalOrder.ejs',{post:items});
             })
               .catch((errorMessage)=>{
                 console.log(errorMessage);
            });
      })

app.get('/galery',(req, res) => {
  res.render('galery.ejs');
})

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);
const db = client.db(dbName);
const collection =db.collection('order');
  app.post("/updateStatusOrder", (req,res) => {
        const  event = req.body;
           collection.updateOne(
               {_id: String(req.body.id) },
               { $set: {status: req.body.status}},
               function(err, result){
                 console.log(err);
               }
           );
           res.send(null);
       }) ;
     })

     app.get('/adminArmor', (req,res) => {
             rez('armor', {})
             .then((items) =>{
                res.send(items);})
                .catch((errorMessage)=>{
                  console.log(errorMessage);
                });
               })

 app.listen(process.env.PORT || 3000, () => {

      console.log('--// PARK AVENJU start 3000 --//');
  })﻿;
