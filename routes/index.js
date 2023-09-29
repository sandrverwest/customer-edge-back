const express = require("express");

const carriersRoutes = require('./carriers');
const producersRoutes = require("./producers");
const coveragesRoutes = require("./coverages");
const contractorsRoutes = require("./contractors");
const levelsRoutes = require("./levels");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const rootRouter = require('./root');

const router = express.Router();

router.use('/api/carriers', carriersRoutes);
router.use('/api/producers', producersRoutes);
router.use('/api/coverages', coveragesRoutes);
router.use('/api/contractors', contractorsRoutes);
router.use('/api/levels', levelsRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/users', usersRoutes);
router.use('/', rootRouter);

module.exports = router;

