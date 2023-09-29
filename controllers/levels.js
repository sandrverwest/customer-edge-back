const Level = require("../models/level");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addLevel = (req, res) => {
    const level = new Level(req.body);
    level
    .save()
    .then((result) => {
        res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getLevels = (req, res) => {
    Level
    .find()
    .sort({ level: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getSingleLevel = (req, res) => {
    Level
    .findOne({level: req.params.level})
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleLevel = (req, res) => {
    Level
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleLevel = (req, res) => {
    Level
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
    addLevel,
    getLevels,
    getSingleLevel,
    updateSingleLevel,
    deleteSingleLevel
}