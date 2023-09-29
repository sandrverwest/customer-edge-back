const Coverage = require("../models/coverage");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addCoverage = (req, res) => {
    const coverage = new Coverage(req.body);
    coverage
    .save()
    .then((result) => {
        res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getCoverages = (req, res) => {
    Coverage
    .find({carrierID: req.params.id})
    .sort({ name: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getSingleCoverage = (req, res) => {
    Coverage
    .findById(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleCoverage = (req, res) => {
    Coverage
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleCoverage = (req, res) => {
    Coverage
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}


module.exports = {
    addCoverage,
    getCoverages,
    getSingleCoverage,
    updateSingleCoverage,
    deleteSingleCoverage
}