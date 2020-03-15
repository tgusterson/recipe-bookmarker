const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../api/models/User');
const Recipe = require('../../api/models/Recipe');

const clearDatabase = async () => {
  await User.deleteMany();
  await Recipe.deleteMany();
};

module.exports = {
  clearDatabase
};