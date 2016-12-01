const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');
const Genre = require('./genre-model')
//const Playlist = require('./playlist-model')

var Song = sequelizeConnection.define('song', {
  title: {
  	type: Sequelize.STRING, 
  	validate: {is: /^[a-z A-Z 0-9]{1,250}$/} 
  },
  youtube_url: {
  	type: Sequelize.STRING,
  	validate: {isURL: true, is: /^[a-z A-Z 0-9 : / ? = .]{1,100}$/} 
  }
});



Song.belongsToMany(Genre, {through: 'SongGenre'})
Genre.belongsToMany(Song,{through: 'SongGenre'})

Song.belongsToMany(Artist,{through: 'SongArtist'})
Artist.belongsToMany(Song,{through: 'SongArtist'})

module.exports = Song;
