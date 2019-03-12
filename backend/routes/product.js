const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get('/create', function(req,res,next){
  new Product({
              name: "Disprin",
              category: "pharmacy",
              locations: [
                            "Apollo Medicine, Sector 63, Gurgaon, Lat - 12.25, Long - 28.52",
                            "Apollo Medicine, Sector 22, Gurgaon, Lat - 12.20, Long - 28.29"
                         ]
              }).save().then(result => {
                res.send(result);
              });
});

router.get('', function(req,res,next){
  Product.find().then(document => {
    res.status(200).json({document: document});
  });
   });
module.exports = router;
