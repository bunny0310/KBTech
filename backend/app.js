const express=require("express");
const app=express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const user_routes = require("./routes/user");
const product_routes = require("./routes/product");
const order_routes = require("./routes/order");

app.use(bodyParser.json({limit:'50mb'}));
app.use(function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods","*");
  next();
});
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
mongoose.connect("mongodb+srv://ikhurana:ishaan123@cluster0-bxch1.mongodb.net/PostApp?retryWrites=true")
.then(() => {
  console.log("Connected to database!");
}).catch(
  () =>{
    console.log("Connection failed!");
  }
);
app.use("/api/user", user_routes);
app.use("/api/product", product_routes);
app.use("/api/order", order_routes);
module.exports = app;
