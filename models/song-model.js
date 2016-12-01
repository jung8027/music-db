const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');

var Song = sequelizeConnection.define('song', {
  title: {type: Sequelize.STRING},
  youtube_url: {type: Sequelize.STRING},
  validate: {is: /^[a-zA-Z0-9]{1,100}$/}
});

Song.belongsTo(Artist);

module.exports = Song;
