const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authcheck = require("../middleware/authcheck");
var jwt1 = require('express-jwt');

var auth = jwt1({
  secret: 'secret123'
});

router.post('/', function(req,res,next){
  const user = new User(
    {
      name: req.body.name,
      mobile: req.body.mobile,
      pwd: bcrypt.hashSync(req.body.pwd, 10),
      type: req.body.type
    }
  );
    user.save().then(result => {
      res.status(201).json({
        error: null,
        userData: result
      })
    }).catch(error => {
      res.status(201).json({
        error: error,
        userData: null
      })
    })
});

router.post('/login', function(req,res,next) {
  let user_public;
  User.findOne({mobile: req.body.mobile}).then(
    user => {
      if(!user)
        return res.status(401).json({
          message:"Auth failed."
        });
        user_public = user;
        return bcrypt.compare(req.body.pwd, user.pwd);
  }).then(result => {
    if(!result)
    return res.status(401).json({
      message:"Auth failed."
    }).catch(error => {
      return res.status(401).json({
        message:"Auth failed."
      });
    });
    const token = jwt.sign({mobile: user_public.mobile, _id: user_public._id, type: user_public.type},
      "secret123",
      {expiresIn: "10h"});
    res.status(201).json({token:token});
  });
});

router.get('', function(req,res,next){
  //  User.find().remove().exec().then(result =>{
  //     res.send(result);
  //  });
  User.find().then(document => {
    res.send(document + req.session.token);
  });
   });
  module.exports = router;
