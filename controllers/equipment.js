const Equipment = require("../models/equipment");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addEquipment = (req, res) => {
    
    Equipment
    .findOne({vin:req.body.vin})
    .then((result) => {
        if(result) {
            res
            .status(404)
            .json({error: `The entered VIN already exists and assigned to SSN/EIN: ${result.ssn_ein}`});
        } else {
            const equipment = new Equipment(req.body);
            equipment
            .save()
            .then((result) => {
                res
                .status(201)
                .json(result);
            })
            .catch((err) => handleError(res, err))
        }
    })
    .catch((err) => handleError(res, err))
}

const getEquipment = (req, res) => {
    let ssn_ein = req.params.ssn_ein;

    Equipment
    .find({ssn_ein})
    // .sort({ name: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getSingleEquipment = (req, res) => {
    Equipment
    .findById(req.params.vin)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleEquipment = (req, res) => {
    Equipment
    .findByIdAndUpdate(req.params.vin, req.body)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleEquipment = (req, res) => {
    Equipment
    .findByIdAndDelete(req.params.vin)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
    addEquipment,
    getEquipment,
    getSingleEquipment,
    updateSingleEquipment,
    deleteSingleEquipment
}