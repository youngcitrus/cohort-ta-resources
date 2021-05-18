const express = require('express');
const asyncHandler = require('express-async-handler');
const { all, one } = require('../data/pet-data');
const router = express.Router();

/* GET users listing. */
router.get('/', asyncHandler(async function(_, res) {
  const pets = await all();
  res.render('pets/index', { pets });
}));

/* GET pet/id listing. */
router.get('/:id', asyncHandler(async function(req, res) {
  const pet = await one(req.params.id);
  res.render('pets/detail', { pet })
}));

module.exports = router;
