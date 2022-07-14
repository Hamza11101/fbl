const Categories = require('../models/categories');
const Livre = require('../models/livres');

exports.getAllCategories = async (req, res, next) => {
    try {
        let cate = await Categories.find().populate('listeDesLivres')
        res.send(cate);
    } catch (error) {
        next();
    }
};

exports.getOneCategories = async (req, res, next) => {
    try {
        let cate = await Categories.findById(req.params.id).populate('listeDesLivres')
        res.send(cate);
    } catch (error) {
        next();
    }
};

exports.addOneCategories = async (req, res, next) => {
    try {
        req.body.listeDesLivres = JSON.parse(req.body.listeDesLivres);
        const cate = new Categories({
            nomcategorie: req.body.nomcategorie,
            listeDesLivres: req.body.listeDesLivres,   
        })
        await cate.save()
        res.send({message: "Categories created successfully."})
    } catch (error) {
        next();
    }
};

exports.updateOneCategories = async (req, res, next) => {
    try {
         await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send({message: "Categories has been updated successfully."})
    }
    catch (error) {
        next();
    }
};

exports.deleteOneCategories = async (req, res, next) => {
    try {
         await Categories.findByIdAndRemove(req.params.id);
        res.send({message: "Categories has been delated successfully."});
    } catch (error) {
        next()
    }
};

exports.getLivres =  async (req, res, next) => {
    try {
        const livres = await Livre.find()
        let newLivreForm = []
        livres.map(livre => {
            newLivreForm.push({label:livre.Titre, value:livre._id})
        })
        res.send(newLivreForm)
    }
    catch (error) {
        next();
    }
};