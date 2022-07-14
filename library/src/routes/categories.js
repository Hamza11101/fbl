
const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories')
const passport = require('passport')

router.get('/categories',  CategoriesController.getAllCategories);


router.get('/categories/:id', CategoriesController.getOneCategories);

router.get("/categories/livres", CategoriesController.getLivres);
router.post("/categories", CategoriesController.addOneCategories);


router.put('/categories/:id', CategoriesController.updateOneCategories);

router.delete('/categories/:id',  CategoriesController.deleteOneCategories);

// passport.authenticate('bearer', { session: false }),

module.exports = router;