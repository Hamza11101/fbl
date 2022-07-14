const Users = require('../models/users');
const Books = require('../models/livres');
const Categories = require('../models/categories');


exports.getAllStat = async (req, res, next) => {
    try {
        let userCount = await Users.countDocuments()
        let booksCount = await Books.countDocuments()
        let categorieCount = await Categories.countDocuments()
    

        res.send({
            users: userCount,
            categories: categorieCount,
            books: booksCount,
           
        });
    } catch (error) {
        next();
    }
};