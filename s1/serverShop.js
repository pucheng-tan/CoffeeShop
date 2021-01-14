'use strict';


// load package
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const axios = require('axios');

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: 'admin',
  database: 'test' 
});



const PORT = 8080;
const HOST = '0.0.0.0';
 
app.get('/connect', (req, res) => {

        con.connect(function(err) {
                if (err) console.log("oops");
                console.log("Connected!");
              });

              res.send("ok");
        });

app.get('/end', (req, res) => {

        con.end(function(err) {
                if (err) console.log(err);
                console.log("off");
              });
      
        res.send("ok");
           });
 
 
app.get('/create', (req, res) => {

            var sql = "CREATE TABLE menu (drinkID INT AUTO_INCREMENT PRIMARY KEY, drinkName VARCHAR(50), drinkPrice FLOAT)";
            con.query(sql, function (err, result) {
              if (err) throw err;
          });
             
          sql = "CREATE TABLE orders (orderID INT AUTO_INCREMENT PRIMARY KEY, customerName VARCHAR(50), totalPrice FLOAT, orderTime VARCHAR(255), orderState VARCHAR(15) DEFAULT 'not ready', orderContent VARCHAR(255))";
            con.query(sql, function (err, result) {
              if (err) throw err;
          });
          
          
            
      res.send("ok");
  });

app.post('/addDrink', (req, res) => {
    var drinkName = req.body.drinkName;
    var drinkPrice = req.body.drinkPrice;

              var sql = "INSERT INTO menu (drinkName, drinkPrice) VALUES ('"+drinkName+"', '"+drinkPrice+"')";
              con.query(sql, function (err, result) {
                if (err) throw err;
            });

                 
              
        res.send("ok");
    });

    app.post('/deleteDrink', (req, res) => {
      var drinkID = req.body.drinkID;
      if (drinkID == "NaN")
      drinkID = 0;
  
                var sql = "DELETE FROM menu WHERE drinkID="+drinkID;
                con.query(sql, function (err, result) {
                  if (err) throw err;
              });
  
                   
                
          res.send("ok");
      });
          
app.get('/selectMenu', (req, res) => {

              var data;

              var sql = 'SELECT * FROM menu';
              con.query(sql, function (err, result, fields) {
                if (err) throw err;

                res.json(result);
                        

                });
              
       
    });

    app.post('/setOrderReady', (req, res) => {
      var orderID = req.body.orderID;
      if (orderID == "NaN")
      orderID = 0;
  
                var sql = "UPDATE orders SET orderState = 'ready' WHERE orderID="+orderID;
                con.query(sql, function (err, result) {
                  if (err) throw err;
              });
  
                   
                
          res.send("ok");
      });

      app.post('/cancelOrder', (req, res) => {
        var orderID = req.body.orderID;
        if (orderID == "NaN")
        orderID = 0;
    
                  var sql = "UPDATE orders SET orderState = 'cancelled' WHERE orderID="+orderID;
                  con.query(sql, function (err, result) {
                    if (err) throw err;
                });
    
                     
                  
            res.send("ok");
        });

    app.get('/selectAllOrder', (req, res) => {

      var data;

      var sql = 'SELECT * FROM orders ORDER BY orderID ASC';
      con.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);
                

        });
        

});

app.post('/selectOrderByName', (req, res) => {

  var customerName = req.body.customerName;

  var sql = 'SELECT * FROM orders WHERE customerName="'+customerName+'"';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.json(result);
            

    });

  });

  app.post('/makeOrder', (req, res) => {
    var customerName = req.body.customerName;
    var orderContent = req.body.orderContent;
    var totalPrice = req.body.totalPrice;

    var dateObj = new Date();

              var sql = "INSERT INTO orders (customerName, orderContent, totalPrice, orderTime) VALUES ('"+customerName+"', '"+orderContent+"',"+totalPrice+",'"+dateObj+"')";
              con.query(sql, function (err, result) {
                if (err) throw err;
            });

                 
              
        res.send("ok");
    });


app.use('/', express.static('pages'));
console.log('up and running');


app.listen(PORT,HOST); 


