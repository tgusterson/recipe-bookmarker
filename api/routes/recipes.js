const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');

// GET all recipes for user
router.get('/', auth, async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ owner: req.user._id });
    res.status(200).send(recipes);
  } catch (e) {
    e.status = 400;
    next(e);
  };
});

// GET individual recipe by ID for user
router.get('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.id, owner: req.user._id });

    if (!recipe) {
      const e = new Error('Recipe not found');
      e.status = 404;
      next(e);
    } else {
      res.status(200).send(recipe);
    };

  } catch (e) {
    e.status = 400;
    e.message = 'Request failed';
    next(e);
  };
});

// POST new recipe for user
router.post('/', auth, async (req, res, next) => {
  const recipe = new Recipe({ ...req.body, owner: req.user._id });
  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    e.status = 400;
    e.message = 'Request failed';
    next(e);
  };
});

// PATCH recipe for user
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { ...req.body },
      { new: true }
    );

    if (!recipe) {
      const e = new Error('Recipe not found');
      e.status = 404;
      next(e);
    } else {
      res.send(recipe);
    };

  } catch (e) {
    e.status = 400;
    e.message = 'Request failed';
    next(e);
  };

});

// DELETE recipe for user
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!recipe) {
      const e = new Error('Recipe not found');
      e.status = 404;
      next(e);
    } else {
      res.send(recipe);
    }

  } catch (e) {
    e.status = 400;
    e.message = 'Request failed';
    next(e);
  };
});

module.exports = router;