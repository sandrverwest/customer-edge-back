const Contractor = require("../models/contractor");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addContractor = (req, res) => {
    
    Contractor
    .findOne({ssn_ein:req.body.ssn_ein})
    .then((result) => {
        if(result) {
            res
            .status(404)
            .json({error: `The entered SSN or EIN already exists and assigned to ${result.businessName ? result.businessName : result.firstName + ' ' + result.lastName}`});
        } else {
            const contractor = new Contractor(req.body);
            contractor
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

const getContractors = (req, res) => {
    let cid = req.params.id;
    let status = req.query.status;

    Contractor
    .find({cid, status})
    // .sort({ name: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getSingleContractor = (req, res) => {
    Contractor
    .findById(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleContractor = (req, res) => {
    Contractor
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleContractor = (req, res) => {
    Contractor
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
    addContractor,
    getContractors,
    getSingleContractor,
    updateSingleContractor,
    deleteSingleContractor
}