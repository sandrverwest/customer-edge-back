const express = require("express");

const {
    addCustomer,
    getCustomers,
    getSingleCustomer,
    updateSingleCustomer,
    deleteSingleCustomer
  } = require("../controllers/customers");

const router = express.Router();

router.post('/', addCustomer);

router.get('/', getCustomers);

router.get('/:id', getSingleCustomer);

router.patch('/:id', updateSingleCustomer);

router.delete('/:id', deleteSingleCustomer);

module.exports = router;