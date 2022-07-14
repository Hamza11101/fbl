const Livre = require('../models/livres')

exports.getAllLivres = async (req, res, next) => {
    try {
        let livre = await Livre.find()
        res.send(livre);
    } catch (error) {
        next();
    }
};

exports.getOneLivre = async (req, res, next) => {
    try {
        let livre = await Livre.findById(req.params.id)
        res.send(livre);

    } catch (error) {
        next();
    }
};

exports.addOneLivre = async (req, res, next) => {

    try {
        // save file
        if(req.file != undefined)
        {
            req.body.picture = `http://localhost:5000/uploads/${req.file.filename}`
        }else{
            req.body.picture =  `http://localhost:5000/uploads/noimg.jpg` 
        }
      
        const livre = new Livre({
            Titre: req.body.Titre,
            Auteur: req.body.Auteur,
            Description: req.body.Description,
            Contenue: req.body.Contenue,
            picture:req.body.picture,
        })
        await livre.save()

        
        res.send({message: "Livre created successfully."})

    } catch (error) {
        console.log(error);
        next();

    }

};


exports.updateOneLivre = async (req, res, next) => {
    try {
        // save file
        if(req.file != undefined)
        {
            req.body.picture = `http://localhost:5000/uploads/${req.file.filename}`
        }else{
            req.body.picture =  `http://localhost:5000/uploads/noimg.jpg` 
        }
      
       
        let livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send({message: "Livre has been updated successfully."})
    }
    catch (error) {
        next();
    }
};

exports.deleteOneLivre = async (req, res, next) => {
    try {
        let livre = await Livre.findByIdAndRemove(req.params.id);
        res.send({message: "Livre has been delated successfully."});
    } catch (error) {
        next()
    }
};