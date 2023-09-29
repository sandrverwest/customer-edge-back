const express = require("express");

const {
    logIn,
    getUserData
} = require("../controllers/auth");

const router = express.Router();


router.post('/', logIn);

router.post('/user', getUserData);

module.exports = router;