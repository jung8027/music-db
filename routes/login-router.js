const User = require('../models/user-model');
const express = require('express');
const router = express.Router();

const logInUser = (req, res) => {
  console.log('Session:', req.session);
  let userInfo = req.body;
  console.log('userInfo', userInfo)
  User.sync()
  //check if user exists
  .then(() => {
    return User.findOne({
      where: {
        user: userInfo.user
      }
    })
  })
  .then((user) => {
    //IF user exists, check if password is correct
    if(user && user.password === userInfo.password) {
      console.log('Password is correct!')
      return user;
    //ELSE IF user does not exist, create new user
    } else if(!user) {
      console.log('Creating new user!');
      return User.create(userInfo)
    } else {
      return null;
    }
  })
  .then((user) => {
    if(user) {
      req.session.user = user.user;
      req.session.save();
      console.log('Updated session?', req.session);
      res.send(user);
    } else {
      res.send('Incorrect password!');
    }
  })
};

//ROUTES//
router.route('/')
  .post(logInUser)

module.exports = router