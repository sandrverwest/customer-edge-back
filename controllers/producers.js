const Producer = require("../models/producer");

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const addProducer = (req, res) => {
    const producer = new Producer(req.body);
    producer
    .save()
    .then((result) => {
        res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const getProducers = (req, res) => {
    Producer
    .find()
    // .sort({ name: 1 })
    .then((carriers) => {
        res
        .status(200)
        .json(carriers);
    })
    .catch((err) => handleError(res, err))
}

const getSingleProducer = (req, res) => {
    Producer
    .findById(req.params.id)
    .then((carrier) => {
        res
        .status(200)
        .json(carrier);
    })
    .catch((err) => handleError(res, err))
}

const updateSingleProducer = (req, res) => {
    Producer
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

const deleteSingleProducer = (req, res) => {
    Producer
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
    addProducer,
    getProducers,
    getSingleProducer,
    updateSingleProducer,
    deleteSingleProducer
}