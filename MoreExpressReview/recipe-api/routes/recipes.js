
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
function createRecipe(req) {
    return {
        name: req.body.name,
        typeOfMeal: req.body.typeOfMeal,
        imageURL: req.body.imageURL,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servingSize: req.body.servingSize,
        cost: req.body.cost,
        ingredients: req.body.ingredients,
        directions: req.body.directions 
    };
}

function updateRecipe(req, recipe) {
    recipe.name = req.body.name;
    recipe.typeOfMeal = req.body.typeOfMeal;
    recipe.imageURL = req.body.imageURL;
    recipe.prepTime = req.body.prepTime;
    recipe.cookTime = req.body.cookTime;
    recipe.servingSize = req.body.servingSize;
    recipe.cost = req.body.cost;
    recipe.ingredients = req.body.ingredients;
    recipe.directions = req.body.directions; 
}
// BUILD THE API

router
    // Get all recipes
    .get('/', (req, res, next) => {
        // TODO: Implement GET API on given route
        RECIPE.find({}, (err, recipes) => {
            if (err) {
                handleError(new Error('Could not find recipes'), res, 404, next);
            } else {
                res.json(recipes);
            }
        });
    })
    // Create new recipe
    .post('/', (req, res, next) => {
        // TODO: Implement POST API on given route
        RECIPE.create(createRecipe(req), (err, recipe) => {
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
        RECIPE.findById(req.params.recipeId, (err, recipe) => {
            if (err) {
                handleError(new Error('Could not find recipe'), res, 404, next);
            } else {
                res.json(recipe);
            }
        });
    })
    // Update recipe by id
    .put((req, res, next) => {
        // TODO: Implement PUT API on given route
        RECIPE.findById(req.params.recipeId, (err, recipe) => {
            if (err) {
                handleError(new Error('Could not find recipe to update'), res, 404, next);
            } else {
                // What if no recipes?  Maybe send an error 
                if(!recipe) {
                    return handleError(new Error("Bad request. Recipe can't be updated."), res, 400, next);
                }
                updateRecipe(req, recipe);
                recipe.save((err, updatedRecipe) => {
                    if (err) {
                        handleError(new Error('Could not update the recipe'), res, 400, next);
                    } else {
                        res.json(updatedRecipe);
                    }
                });
            }
        });
    })
    // Delete recipe with id
    .delete((req, res, next) => {
        // TODO: Implement DELETE API on given route
        RECIPE.findByIdAndRemove(req.params.recipeId)
            .exec(err => {
                if (err) {
                    handleError(new Error('Could not find recipe to delete'), res, 404, next);
                } else {
                    res.status = 204;
                    res.json(null);
                }
            });
    });

module.exports = router;