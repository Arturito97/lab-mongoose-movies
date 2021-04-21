const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');


router.get('/celebrities', async (req, res, next) => {
  try{
    const celebritiesFromDB = await Celebrity.find();
    console.log(celebritiesFromDB);
    res.render('celebrities/index', { celebritiesFromDB })
  } catch(e) {
    next(e)
  }
});

router.get('/celebrities/new', async(req, res, next) => {
  try{
    const allMovies = await Movie.find();
    res.render('celebrities/new', {allMovies});
  } catch(e) {
    next(e)
  }
});

router.post('/celebrities/new', async(req, res, next) => {
  try{
    const {name, occupation, catchphrase} = req.body;
    await Celebrity.create(req.body);
    res.redirect('/celebrities');
  } catch(e) {
    res.render('celebrities/new');
  }
});


//MUST BE AFTER THE ROUTER 'NEW'
router.get('/celebrities/:id', async (req, res, next) => {
  try{
    const celebrity = await Celebrity.findById(req.params.id).populate('movie');
    res.render('celebrities/show', { celebrity });
  } catch(e) {
    next(e)
  }
});

router.get('/celebrities/:id/edit', async (req, res, next) => {
  try{
    const celebrity = await Celebrity.findById(req.params.id).populate('movie');
    const allMovies = await Movie.find();
    res.render('celebrities/edit', {celebrity, allMovies} )
  } catch(e) {
    next(e)
  }
})

router.post('/celebrities/:id/edit', async (req, res, next) => {
  try{
    const celebrityId = req.params.id;
    const { name, occupation, catchphrase} = req.body;
    await Celebrity.findByIdAndUpdate(celebrityId, req.body);
    res.redirect('/celebrities');
  } catch(e) {
    next(e)
  }
})

router.post('/celebrities/:id/delete', async (req, res, next) => {
  try{
    await Celebrity.findByIdAndRemove(req.params.id);
    res.redirect('/celebrities');
  } catch(e) {
    next(e)
  }
})

module.exports = router;