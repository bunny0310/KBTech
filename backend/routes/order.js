const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

router.post("/", function(req,res,next){

  let ctr;
  let did;
  User.count().then(
    count => {
      ctr = count;
    });
    User.findOne({type:'delivery'}).skip(Math.floor(Math.random() * ctr)).then(
      user => {
        console.log(user);
        if(!user)
          return res.status(500).json({message:'user not found'});
        did = user._id;
        let lns=[];
        req.body.order.products.forEach(function(product){
          var ctr=0;
          Product.findOne({_id:product.product_id}).then (
            product => {
              var i = Math.floor(Math.random() * product.locations.length);
              i=i-1;
              lns[ctr]=product.locations[i];
            }
          );
          ctr++;
          if(ctr == req.body.order.products.length)
          {
            const order = new Order({
              products: req.body.order.products,
              delivery_person_id: did,
              order_stage: 'Created',
              user_id: req.body.order.user_id,
              pickup_locations: lns
            });
            order.save().then(result => {
              console.log(result);
            });
          }
        });
      }
    );
    try {
      jwt.verify(req.body.token, "secret123");
      res.status(201).json({
        message: "Auth successful"
      })
    }catch(error){
          return res.status(401).json({
            message: "Auth failed!" + error
          });
        }
});

router.get('/', function(req,res,next){
  console.log(req.query);
  if(req.query.type=="undefined"){
  Order.find().then(document => {
    res.status(200).json({document: document});
  });
}
else {
  Order.find({order_stage:req.query.type}).then(document => {
    res.status(200).json({document: document});
  });
}
});
router.get('/delivery', function(req,res,next){
  User.find({type:'delivery'}).then(document => {
    res.status(200).json({document: document});
  });
});

router.get('/delivery', function(req,res,next){
  User.find({type:'delivery'}).then(document => {
    res.status(200).json({document: document});
  });
});
router.post('/delivery_update', function(req,res,next){
  try {
    jwt.verify(req.body.token, "secret123");
    if(req.body.type=="admin")
      res.status(201).json({
        message: "Auth successful"
      })
    else {
      return res.status(401).json({
        message: "Not authorized!" + error
      });
    }
  }catch(error){
        return res.status(401).json({
          message: "Auth failed!" + error
        });
      }
      Order.findOneAndUpdate({_id: req.body.order_id}, {delivery_person_id: req.body.del_id}, function(err){
        if(err)
          console.log(err);
        else
          console.log("updated");
      });

});

router.post('/status_update', function(req,res,next){
  try {
    jwt.verify(req.body.token, "secret123");
    if(req.body.type=="delivery")
      res.status(201).json({
        message: "Auth successful"
      })
    else {
      return res.status(401).json({
        message: "Not authorized!" + error
      });
    }
  }catch(error){
        return res.status(401).json({
          message: "Auth failed!" + error
        });
      }
      Order.findOneAndUpdate({_id: req.body.order_id}, {order_stage: req.body.status}, function(err){
        if(err)
          console.log(err);
        else
          console.log("updated");
      });

});

module.exports = router;
