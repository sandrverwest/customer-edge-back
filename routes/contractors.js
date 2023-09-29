const express = require("express");

const {
    addContractor,
    getContractors,
    getSingleContractor,
    updateSingleContractor,
    deleteSingleContractor
} = require("../controllers/contractors");

const router = express.Router();

router.post('/', addContractor);

router.get('/carrier/:id', getContractors);

router.get('/:id', getSingleContractor);

router.patch('/:id', updateSingleContractor);

router.delete('/:id', deleteSingleContractor);

module.exports = router;