const User = require("../models/user");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const sharp = require('sharp');

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addUser = (req, res) => {
    User
    .findOne( { username: req.body.username}, { firstName:1, lastName: 1, username: 1 } )
    .then((result) => {
            if(result) {
            res.
            status(200).
            json(result);
        } else {
            const user = new User(req.body);
            user
            .save()
            .then((result) => {
                res
                .status(201)
                .json(result);
            })
            .catch((err) => handleError(res, err))
        }
    })
}

const getUsers = (req, res) => {
    let queryParam
    if(req.query.active === 'true'){
        queryParam = {isDeactivated: false}
    } else if(req.query.active === 'false'){
        queryParam = {isDeactivated: true}
    } else {
        queryParam = null
    }
    User
    .find(queryParam, { hash:0 })
    .sort({ createdAt: -1 })
    .then((result) => {
            res
            .status(200)
            .json(result);

        })
    .catch((err) => handleError(res, err))
}

const getSingleUser = (req, res) => {
    User
    .findById(req.params.id, { hash:0 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleUser = (req, res) => {
    User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
console.log(req.body.password)
        if(req.body.password) {
            result.setPassword(req.body.password);
        }


        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleUser = (req, res) => {
    User
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const uploadUserPhoto = (req, res) => {

    fs.readFile(`./files/users/${req.params.id}/${req.params.id}`, (err, data) => {
        if (err) {
            console.error('Error reading input image:', err);
        } else {
            sharp(data)
            .resize(500, null)
            .toFile(`./files/users/${req.params.id}/${req.params.id}`, (err, info) => {
                if (err) {
                console.error('Error resizing image:', err);
                return;
                }
        
                console.log('Image resized successfully.');
            });
        }
      });

    User
    .findByIdAndUpdate(req.params.id, {photo: req.params.id}, { new: true })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}


const getUserPhoto = (req, res) => {  
    fs.readFile(`./files/users/${req.params.id}/${req.params.id}`, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Image not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
          }
    })
}

module.exports = {
    addUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    uploadUserPhoto,
    getUserPhoto
}