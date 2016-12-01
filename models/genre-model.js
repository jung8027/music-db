const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Song = require('./song-model');

var Genre = sequelizeConnection.define('genre', {
  title: {
    type: Sequelize.STRING,
    validate: {len: [1,100]} // validate input
  }
});

// Genre.belongsToMany(Song,{through: 'SongGenre'})
// Song.belongsToMany(Playlist,{through: 'SongPlaylist'})

module.exports = Genre;
