const express = require('express');
const router = express.Router();
const LivreController = require('../controllers/livres')
const passport = require('passport')
const upload = require('../utils/multer');

router.get('/livres',  LivreController.getAllLivres);

router.get('/livres/:id', LivreController.getOneLivre);

router.post('/livres',  upload.single('picture') ,LivreController.addOneLivre);

router.put('/livres/:id',   upload.single('picture'),LivreController.updateOneLivre);

router.delete('/livres/:id',  LivreController.deleteOneLivre);


// passport.authenticate('bearer', { session: false }),


module.exports = router;