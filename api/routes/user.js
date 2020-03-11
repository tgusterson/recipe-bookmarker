const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    e.status = 400;
    e.message = 'Signup failed';
    next(e);
  };
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    e.status = 400;
    next(e);
  };
});

router.get('/me', auth, async (req, res, next) => {
  const user = req.user;
  try {
    res.send({ user })
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.patch('/me', auth, async (req, res, next) => {
  const user = req.user;
  const updates = Object.keys(req.body);
  try {
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (e) {
    e.status = 400;
    e.message = 'Invalid updates';
    next(e);
  };
});

router.delete('/me', auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send(req.user);

  } catch (e) {
    next(e);
  }
})

module.exports = router;