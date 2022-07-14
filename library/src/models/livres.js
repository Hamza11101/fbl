
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const livreSchema = new Schema({

    Titre: String,
    Auteur: String,
    Description: String,
    Contenue: String,
    picture:String,
}, {
    timestamps: true,
    versionKey: false
});

const Livre = mongoose.model('livre', livreSchema);
module.exports = Livre;