const Playlist = require('../models/playlist-model');
const Song = require('../models/song-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//
const getAllPlaylists = (req,res) =>(
  Playlist.findAll({ include: [Song] })
  .then(playlistInfo=>
  	res.send(playlistInfo))
	)

const getPlaylistById = (req,res)=>(
	Playlist.findOne({ where: {id: req.params.id}, include: [Song] })
	.then(playlistId=>res.send(playlistId))
	)

const newPlaylist = (req,res)=>{
	let body = req.body
	Playlist.create({
		title: body.title
	})
	.then(()=>res.send('Playlist with name '+body.title+' created!'))
	}

const updatePlaylist = (req,res)=>{
	Song.findAll({ where: { title: req.params.songName } })
	.then((songInfo)=>{
		Playlist.findOne({ where: {id: req.params.id}, include: [Song] })
		.then((playlistInfo)=>{
			playlistInfo.addSongs([songInfo[0].dataValues.id])
		})
	})
	.then(()=>res.send('Playlist ID:'+req.params.id+' updated with song: '+req.params.songName))
	}

const deletePlaylistById = (req,res)=>(
	Playlist.destroy({ where: { id: req.params.id } })
  .then(()=> res.send('Playlist with id: '+req.params.id+' has been deleted'))
  )

//ROUTES//
router.route('/')
  .get(getAllPlaylists)
  .post(newPlaylist) // needs title

router.route('/:id/:songName')
  .put(updatePlaylist)

router.route('/:id')
  .get(getPlaylistById)
  .delete(deletePlaylistById)

module.exports = router