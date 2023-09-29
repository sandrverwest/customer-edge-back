const User = require("../models/user");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const logIn = (req, res) => {
    User
    .findOne({email:req.body.email})
    .then((result) => {
        if(result) {
            bcrypt.compare(req.body.password, result.hash, (err, isVerified) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return;
                }
                if (isVerified) {                   
                    const payload = {
                        email: result.email,
                        first_name: result.first_name,
                        last_name: result.last_name
                    }
                    const jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const token = jwt.sign(payload, jwtSecretKey, {
                        expiresIn: '12h',
                        subject: result.id
                    });

                    res
                    .status(200)
                    .json({token});
                } else {
                    res
                    .status(401)
                    .json({error: `Password doesn't match`});
                }
            });
        } else {
            res
            .status(401)
            .json({error: 'User was not found'});
            // .send('User not found.');
        }
    })
    .catch((err) => handleError(res, err))
}

const getUserData = (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get('Auth')
    if(!token) {
        return res.status(401).send('Token was not found.')
    }
    jwt.verify(token, jwtSecretKey, function(error, decoded) {
        if(error) {
            return res.status(401).send(error.message)
        }
        if(decoded) {
            User
            .findById(decoded.sub, { password:0 })
            .then((result) => {
                if(result) {
                    res
                    .status(200)
                    .json(result);       
                } else {
                    res
                    .status(401)
                    .json(result);
                }
            })
            .catch((err) => handleError(res, err))
        }
    })
}

const testHandler = (req, res) => {
    console.log(req)
}

module.exports = {
    logIn,
    getUserData
}