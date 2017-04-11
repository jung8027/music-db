const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

var User = sequelizeConnection.define('user', {
  user: {
    type: Sequelize.STRING
   // validate: {is: /^[a-z A-Z &]{1,100}$/} // validate input
  },
  email :{
  	type:Sequelize.STRING
 // 	validate: {is: /^[a-z A-Z &]{1,100}$/} 
  },
  password:{
    type: Sequelize.STRING
//    validate: {is: /^[a-z A-Z &]{1,100}$/}
  }
});

//User.sync();

module.exports = User;
