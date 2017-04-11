//const User = require('../models/user-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//
const checkUserSession = (req,res)=>{
  if(req.session.user) {
    res.send(req.session.user);
  } else {
    res.send(null);
  }
};



//ROUTES//
router.route('/')
  .get(checkUserSession)

module.exports = router