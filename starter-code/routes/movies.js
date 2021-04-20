const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

router.get('/movies/create', async(req, res) => {
  res.render('movies/create');
});

router.post('/movies/create', async (req, res) => {
  const { title, genre, plot } = req.body;
  await Movie.create(req.body);
  res.redirect('/movies')
})

module.exports = router;