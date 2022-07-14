const User = require('../models/users')
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res, next) => {
    try {
        let user = await User.find()
        res.send(user);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.getOneUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        res.send(user);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.addOneUser = async (req, res, next) => {

    try {
       
        const userFound = await User.find({ email: req.body.email });
        if (userFound.length > 0) {
            res.status(400).send({ message: 'E-mail already in use.' })
        }
        else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: req.body.role,
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
            await user.save()
            res.send({message: "User created successfully."})
        }

    } catch (error) {
        console.log(error);
        next();
    }

};

exports.updateOneUser = async (req, res, next) => {
    try {
        
        const userFound = await User.find({ email: req.body.email, _id :  {$ne: req.params.id}});
        if (userFound.length > 0 ) {
            res.status(400).send({ message: 'E-mail already in use.' })
        }
        else {
            if( req.body.password != ""){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }else{
                delete  req.body.password;
            }
            await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send({ message: 'User has been updated.' })
        }
    }
    catch (error) {
        console.log(error);
        next();
    }
};

exports.deleteOneUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id);
        res.send({message: 'User has been deleted successfully.'});
    } catch (error) {
        console.log(error);
        next();
    }
};
