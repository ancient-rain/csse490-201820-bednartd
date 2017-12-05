const express = require('express'),
    router = express.Router(),
    RECIPE = require('../models/recipe');

// Get recipe ideas from http://www.simplyrecipes.com/
// e.g., http://www.simplyrecipes.com/recipes/skillet_chicken_puttanesca/print/

// Lets us use HTTP verbs such a PUT and DELETE in
// places where the client doesn't support it
const methodOverride = require('method-override');

router.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, statusCode, next) {
    res.status(statusCode);
    err.status = statusCode;
    next(err);
}


// TODO: Add utility functions to create and update recipes

// BUILD THE API

router
    // Get all recipes
    .get('/', (req, res, next) => {
        RECIPE.find({}, (err, recipes) => {
            if (err) {
                handleError(new Error('Could not find recipe'), res, 404, next);
            } else {
                res.json(recipes);
            }
        });
    })
    // Create new recipe
    .post('/', (req, res, next) => {
        // DONE: Implement POST API on given route
        RECIPE.create({
            name: req.body.name,
            typeOfMeal: req.body.typeOfMeal,
            imageURL: req.body.imageURL,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servingSize: req.body.servingSize,
            cost: req.body.cost,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        }, (err, recipe) => {
            if (err) {
                handleError(new Error('Could not add recipe'), res, 400, next);
            } else {
                res.json(recipe);
            }
        });
    });


router.route('/:recipeId')
    //Get recipe by id
    .get((req, res, next) => {
        // TODO: Implement GET API on given route
    })
    // Update recipe by id
    .put((req, res, next) => {
        // TODO: Implement PUT API on given route
    })
    // Delete recipe with id
    .delete((req, res, next) => {
        // TODO: Implement DELETE API on given route
    });

module.exports = router;