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

//ROUTES//
router.route('/')
 .get(getAllArtists)


module.exports = router