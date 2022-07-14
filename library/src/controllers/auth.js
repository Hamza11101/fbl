const User = require('../models/users')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.logIn = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "1d",
                    }
                );
                res.status(200).json({ message: "Login sucessfully.", token: token });
            } else {
                res.status(400).json({ message: "E-mail or password is invalid." });
            }
        } else {
            res.status(401).json({ message: "E-mail or password is invalid." });

        }
    }

    catch (error) {
        console.log(error);
        next();
    }
}




exports.register = async (req, res, next) => {

    try {

        const userFound = await User.find({ email: req.body.email });
        if (userFound.length > 0) {
            res.status(400).send({ message: 'E-mail already in use.' })
        }
        else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email
            })
            // now we set user password to hashed password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            user.save();
            res.send({ message: "You account has been created successfully." });
        }

    } catch (error) {
        console.log(error);
        next();
    }
};
