const express = require('express');

const rootHandler = require('../controllers/root')

const router = express.Router();

router.get('/', rootHandler);

module.exports = router;