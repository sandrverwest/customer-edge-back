const express = require("express");

const {
    addLevel,
    getLevels,
    getSingleLevel,
    updateSingleLevel,
    deleteSingleLevel
} = require("../controllers/levels");

const router = express.Router();

router.post('/', addLevel);

router.get('/', getLevels);

router.get('/:level', getSingleLevel);

router.patch('/:id', updateSingleLevel);

router.delete('/:id', deleteSingleLevel);

module.exports = router;