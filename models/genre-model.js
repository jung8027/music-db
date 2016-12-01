const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Song = require('./genre-models');

var Genre = sequelizeConnection.define('genre', {
  title: {
    type: Sequelize.STRING
    validate: {is: /^[a-zA -Z0-9]{1,250}$/} // validate input
  }
});

Genre.belongsToMany(Song,{through 'song-genre'})
module.exports = Genre;
