const Carrier = require("../models/carrier");

const fs = require('fs');
const sharp = require('sharp');

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addCarrier = (req, res) => {
    Carrier
    .findOne( {$or: [{ mc: req.body.mc}, { usdot: req.body.usdot}] }, { name:1, mc: 1, usdot: 1 } )
    .then((result) => {
            if(result) {
            res.status(200).json({isExists:true, ...result._doc});
            console.log({isExists:true, ...result._doc});
        } else {
            const carrier = new Carrier(req.body);
            carrier
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

const getCarriers = (req, res) => {
    let query
    if(req.query.name) {
        query = { name: Number.parseInt(req.query.name)}
    } else {
        query = null
    }
    
    Carrier
    .find({}, query)
    .sort({ name: 1 })
    .then((carriers) => {
        res
        .status(200)
        .json(carriers);
    })
    .catch((err) => handleError(res, err))
}

const getSingleCarrier = (req, res) => {
    Carrier
    .findById(req.params.id)
    .then((carrier) => {
        res
        .status(200)
        .json(carrier);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleCarrier = (req, res) => {
    Carrier
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleCarrier = (req, res) => {
    Carrier
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}


const uploadCarrierLogo = (req, res) => {

    fs.readFile(`./files/carriers/${req.params.id}/${req.params.id}`, (err, data) => {
        if (err) {
            console.error('Error reading input image:', err);
        } else {
            sharp(data)
            .resize(500, null)
            .toFile(`./files/carriers/${req.params.id}/${req.params.id}`, (err, info) => {
                if (err) {
                console.error('Error resizing image:', err);
                return;
                }
                console.log('Image resized successfully.', req.params.id);
            });
        }
      });

    Carrier
    .findByIdAndUpdate(req.params.id, {photo: req.params.id}, { new: true })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}


const getCarrierLogo = (req, res) => {  
    fs.readFile(`./files/carriers/${req.params.id}/${req.params.id}`, (err, data) => {
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
    addCarrier,
    getCarriers,
    getSingleCarrier,
    updateSingleCarrier,
    deleteSingleCarrier,
    uploadCarrierLogo,
    getCarrierLogo
}