const Artist = require('../models/artist-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//
const getAllArtists = (req,res)=>(
  Artist.findAll({ 
  	order: [['name', 'ASC']] 
  })
  .then(ArtistInfo=>
   	res.send(ArtistInfo)
 	)
)

const getArtistById = (req,res)=>(
	Artist.findOne({ 
		where: {id: req.params.id} 
	})
  .then(ArtistId=>
  	res.send(ArtistId)
 	)
)

const postNewArtist = (req,res)=>{
	let body = req.body;
	Artist.create({
		name: body.name
	})
	.then(()=>
		res.send('Artist with name '+body.name+' created!')
	)
}

const updateArtist = (req,res)=>(
  Artist.findOne({
  	where: {id: req.params.id}
  })
  .then(ArtistId=>
  	ArtistId.update({
  		name: req.params.name
  	})
  )
  .then(()=>
  	res.send('Artist with Id:'+req.params.id+' updated to name: '+req.params.name)
  )
)

const deleteArtist = (req,res)=>{
	Artist.destroy({where:{id:req.params.id}})
	.then((id)=>{res.send(id.name + ' has been deleted!')})
}


//ROUTES//
router.route('/')
 .get(getAllArtists)
 .post(postNewArtist) //needs name

router.route('/:id')
 .get(getArtistById)
 .delete(deleteArtist)

router.route('/:id/:newName')
  .put(updateArtist)

module.exports = router