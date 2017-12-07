const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    typeOfMeal: String,
    imageURL: String,
    prepTime: String,
    cookTime: String,
    servingSize: String,
    cost: String,
    ingredients: [String],
    directions: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
