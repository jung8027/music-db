const Song = require('../models/song-model');
const Genre = require('../models/genre-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//

// '/api/songs' with genre and artist
const getAllSongs = (req,res)=>{
	Song.findAll({include: [Genre]})
	.then((data)=>{res.send(data)})
}


// /api/songs/:id GET specific song by id
const getOneSong = (req,res)=>{
	Song.findById(req.params.id)
	.then((data)=>{res.send(data)})
}

//not working
// // /api/songs POST (create) a new song
// // To add in the genres you will need to use a special 'accessor' method. That Sequelize automatically creates. Checkout the following Sequelize docs and look at the 'getUsers', 'setUsers', 'addUser', 'addProject', 'setProject', 'getProject', etc. examples. These methods are all automatically created and will be named according to the name of your models. You can also see the song-seed.js file for a code example of one of these methods in use. Note that when you call the methods you have to use them on the individual songs (aka instances) and not on the model itself.
// /api/songs
const createOneSong = (req,res)=>{
	Song.create({title:req.body.title})
	.then((data)=>{res.send(data)})
}


// /api/songs/:id/:newTitle (update) a specific song's title
const updateSong = (req,res)=>{
	Song.update(
		{title: req.params.newTitle},
		{where: {id: req.params.id}}
	)
	.then((id)=>{Song.findById(parseInt(id))})
	.then((data)=>{res.send(data +' UPDATED!')})
}


// /api/songs/:id
const deleteSong = (req,res)=>{
	Song.destroy({where: {id: req.params.id}})
	.then((id)=>{res.send(id +'DELETE!')})
}



//ROUTES//
router.route('/')
.get(getAllSongs)
.post(createOneSong)

router.route('/:id')
.get(getOneSong)
.put(updateSong)
.delete(deleteSong)

router.route('/:id/:newTitle')
  .put(updateSong)

module.exports = router