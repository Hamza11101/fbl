
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorieSchema = new Schema({
    
    nomcategorie:String,    
    listeDesLivres:[{type:Schema.Types.ObjectId,ref:'livre'}]    
},{
    timestamps: true,
    versionKey: false
});

const Categorie = mongoose.model('categorie',categorieSchema);
module.exports = Categorie;