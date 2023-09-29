const express = require("express");

const {
    addCoverage,
    getCoverages,
    getSingleCoverage,
    updateSingleCoverage,
    deleteSingleCoverage
} = require("../controllers/coverages");

const router = express.Router();

router.post('/', addCoverage);

router.get('/carrier/:id', getCoverages);

router.get('/:id', getSingleCoverage);

router.patch('/:id', updateSingleCoverage);

router.delete('/:id', deleteSingleCoverage);

module.exports = router;