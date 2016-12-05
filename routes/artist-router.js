const Artist = require('../models/artist-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//
const getAllArtists = (req,res)=>(
  Artist.findAll()
  .then((data)=>
   	res.send(data)
   	)
  )


const getOneArtist = (req,res)=> {
	Artist.findById(req.params.id)
	// Artist.findById(req.params.id)
	.then((data)=>
   	res.send(data)
   	)
}


const createArtist = (req,res)=>{
	Artist.create({name: req.body.name})
	.then((data)=>{res.send(data)})
}


// /api/artists/:id 
const deleteArtist = (req,res)=>{
	Artist.destroy({where:{id:req.params.id}})
	.then((id)=>{res.send(id.name + ' has been deleted!')})
}

//  /api/artists/:id/:newName  (update)
const updateArtist = (req,res)=>{
	Artist.update(
		{name:req.params.newName},
		{where: {id:req.params.id}}
	)
	.then((id)=>{Artist.findById(parseInt(id))})
	.then((data)=>{res.send(data + ' updated!')})
}


//
//ROUTES//
router.route('/')
 .get(getAllArtists)
 .post(createArtist)

router.route('/:id')
 .get(getOneArtist)
 .delete(deleteArtist)

router.route('/:id/:newName')
  .put(updateArtist)

module.exports = router