const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const passport = require('passport')

// get a list of users from the db
router.get('/users', userController.getAllUsers);


// get one user by id
router.get('/users/:id',  userController.getOneUser);

//add a new user to the db
router.post("/users",  userController.addOneUser);

// update a list of todo from the db
router.put('/users/:id',  userController.updateOneUser);

//delete a users to the db
router.delete('/users/:id',  userController.deleteOneUser);

// passport.authenticate('bearer', { session: false }),

module.exports = router;