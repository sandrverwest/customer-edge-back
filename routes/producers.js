const express = require("express");

const {
    addProducer,
    getProducers,
    getSingleProducer,
    updateSingleProducer,
    deleteSingleProducer
} = require("../controllers/producers");

const router = express.Router();

router.post('/', addProducer);

router.get('/', getProducers);

router.get('/:id', getSingleProducer);

router.patch('/:id', updateSingleProducer);

router.delete('/:id', deleteSingleProducer);

module.exports = router;