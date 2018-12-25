const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let Data = new Date();
const multer  = require('multer')
const fs = require('fs');
const rimraf = require('rimraf');
const express = require('express');
const bodyParser = require( 'body-parser' );
const galery = './public/image/galery/';
const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://alex:panik1993@ds239873.mlab.com:39873/heroku_4b2prwdg';
const dbName = 'heroku_4b2prwdg';
var massivZaskazov = {};
let service = require("./public/json/serviceJSON.js");
const rez = require("./public/modules/searchJS");
require("pidcrypt/seedrandom")

var pidCrypt = require("pidcrypt")
require("pidcrypt/aes_cbc")

var aes = new pidCrypt.AES.CBC();
var pw =  "alexGurski";

app.get('/userList', (req,res) => {
rez('usersList', {})
.then((items) =>{
   res.send(items);})
   .catch((errorMessage)=>{
     console.log(errorMessage);
   });
  })

  MongoClient.connect(url, (err, client) => {
              assert.equal(null, err);
              const db = client.db(dbName);
              const collection =db.collection('usersList');
                app.post("/userUpdate", (req,res) => {
                      console.log(req.body)
                         collection.update(
                             {_id: req.body.phone },
                             {imia: req.body.imia,
                              phone: req.body.phone,
                              password:req.body.password,
                              adress:req.body.adress
                             }
                             ,{ upsert: true },
                             function(err, result){
                               console.log(err);
                             }
                         );
                          res.send('YES')
                     }) ;
                   })



MongoClient.connect(url, (err, client) => {
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection =db.collection('usersList');

app.post("/user", (req,res) => {
  console.log(req.body)
      rez('usersList', {})
      .then((item) =>{
        var countList=false;
          for (let i=0;i<item.length;i++){
              if (item[i].phone === req.body.phone){
                return false;
              }
          }
          return true;
      }) .then((counter) => {
          console.log(counter)
          if (counter){  collection.update(
                            {_id: req.body.phone },
                            {phone: req.body.phone,
                             password:req.body.password
                            }
                            ,{ upsert: true },
                            function(err, result){
                              console.log(err);
                            }
                       );
                       res.send('ACCEPT');
                     } else {
                       res.send(false);
                     }
      })
  });
})

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);
const db = client.db(dbName);
//const collection = db.collection('event');
  app.post("/book", (req,res) => {
        const  event= { "date":Data.getHours() + ':' + Data.getMinutes() + ':' + Data.getSeconds() + '. ' + Data.getDate() + ' '
          + monthNames[Data.getMonth()] +' '+ Data.getFullYear(),
                        "name":String(req.body.name),
                        "text":String(req.body.text)
                      };
            db.collection('event').insertOne(event,(err,result)=>{
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }
                      res.redirect('/book')
                  })
      })
});

/*
app.post('/user',function(req,res,next){
  console.log(req.body);

//////
var encrypted = aes.encryptText(req.body.phone, pw);
console.log("Зашифрованный номер телефона: '%s'", encrypted);
var decrypted = aes.decryptText(encrypted, pw);
console.log("Оригинальный номер телефона: '%s'", decrypted);
var encrypted = aes.encryptText(req.body.password, pw);
console.log("Зашифрованный пароль: '%s'", encrypted);
var decrypted = aes.decryptText(encrypted, pw);
console.log("Оригинальный пароль: '%s'", decrypted);

/////
  res.send(null);
})
*/
app.get('/user',(req, res) => {
  res.render('user.ejs');
})



app.post('/createDir',function(req,res,next){
  fs.mkdirSync(galery+req.body.text);
  res.redirect('/administrator')
})

app.post('/deleteDir',function(req,res,next){
    rimraf(galery+req.body.text, function () {
    res.redirect('/administrator')});
})

app.post('/profile', multer().array('photo', 100), function (req, res, next) {
  //  console.log(req.files);
    for (let i=0;i<req.files.length;i++){
      let wstream = fs.createWriteStream(galery+req.body.text+'/'+req.files[i].originalname);
        wstream.write(req.files[i].buffer);
        wstream.end();
    }
      res.redirect('/administrator')
})

app.get('/galeryFolber',(req, res) => {
    fs.readdir(galery, (err, files) => {
    res.send(files);
    })
})

app.post("/getFilesInFolber", (req,res) => {
    fs.readdir(galery+req.body.name, (err, files) => {
    res.send(files);
  })
});

app.get('/administrator', (req,res) =>{
      res.render('administrator.ejs');
})


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

    app.get('/armor', (req, res) => {
                  res.render ('armor.ejs');
                  } );

      app.get('/armorFree', (req,res) => {
              rez('armor', {})
              .then((items) =>{
                res.send(items);})
                  .catch((errorMessage)=>{
                    console.log(errorMessage);
                    });
    })

    app.get('/adminArmor', (req,res) => {
            rez('armor', {})
            .then((items) =>{
               res.send(items);})
               .catch((errorMessage)=>{
                 console.log(errorMessage);
               });
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

              MongoClient.connect(url, (err, client) => {
              assert.equal(null, err);
              const db = client.db(dbName);
              const collection =db.collection('armor');
                app.post("/armor", (req,res) => {
                  console.log(req.body)
                          collection.insertOne(req.body,(err,result)=>{
                                    if(err){
                                      console.log(err);
                                      res.sendStatus(500);
                                    }
                                    res.redirect('/armor')
                                })
                    })
              });

    MongoClient.connect(url, (err, client) => {
                assert.equal(null, err);
                const db = client.db(dbName);
                const collection =db.collection('menuWith');
                  app.post("/admin", (req,res) => {
                        console.log(req.body)
                           collection.update(
                               {_id: req.body._id },
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

app.get('/book', (req,res)=>{

  rez('event', {})
  .then((items) =>{
     res.render ('book.ejs', {mainCenter:items});
   })
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
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

  fs.readFile( './sitemap.xml', function(err, data) {
    app.get('/sitemap.xml', function(req, res) {
    res.send(data);
    });
  });

    app.get('/robots.txt', function(req, res) {
        res.send( fs.readFileSync("robots.txt", "utf8"));
    });

    app.get('/robots.txt', function(req, res) {
       res.send( fs.readFileSync("robots.txt", "utf8"));
     });

     fs.readFile( './sitemap.xml', function(err, data) {
app.get('/sitemap.xml', function(req, res) {
  res.setHeader('content-type', 'text/xml; charset=utf-8');
  res.setHeader('content-disposition', 'inline');
      res.send(data);
    });
 });

 app.listen(process.env.PORT ||80, () => {
      console.log('--// PARK AVENJU start 3000 --//');
  })﻿;
