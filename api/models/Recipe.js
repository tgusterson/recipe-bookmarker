const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  ingredients: [String],
  recipePath: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: Buffer
  },
  haveCooked: {
    type: Boolean,
    required: false,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
  {
    timestamps: true
  }
);

recipeSchema.methods.toJSON = function () {
  const recipe = this;
  const recipeObject = recipe.toObject();

  delete recipeObject.picture;
  delete recipeObject.__v;

  return recipeObject;
};

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;