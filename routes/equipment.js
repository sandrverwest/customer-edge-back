const express = require("express");

const {
    addEquipment,
    getEquipment,
    getSingleEquipment,
    updateSingleEquipment,
    deleteSingleEquipment
} = require("../controllers/equipment");

const router = express.Router();

router.post('/', addEquipment);

router.get('/contractor/:ssn_ein', getEquipment);

router.get('/:vin', getSingleEquipment);

router.patch('/:vin', updateSingleEquipment);

router.delete('/:vin', deleteSingleEquipment);

module.exports = router;