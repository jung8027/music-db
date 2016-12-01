const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Song = require('./song-model');

var Playlist = sequelizeConnection.define('playlist', {
  title: {
  	type: Sequelize.STRING, 
  	validate: {is: /^[a-zA-Z0-9]{1,100}$/} 
  }
});
Playlist.belongsToMany(Song,{through 'song-playlist'})

module.exports = Playlist;
