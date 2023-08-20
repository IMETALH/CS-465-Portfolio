const express = require('express');
const router = express.Router();
//const { expressjwt: jwt } = require("express-jwt");

const { expressjwt: expressJwt } = require('express-jwt');

const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'] // Use 'HS512' algorithm
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router; // Corrected export statement