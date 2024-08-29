const express = require('express');
const router = express.Router();
//const { expressjwt: jwt } = require("express-jwt");
const { expressjwt: expressJwt } = require('express-jwt');

//const auth = jwt({
const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'] // Use 'HS512' algorithm
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');



// Define the routes for the API
    // Route to authenticate a user
router
    .route('/login')
    .post(authController.login);

    // Route to register a user
router
    .route('/register')
    .post(authController.register);

    // Route to get all trips
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

    // Route to get a specific trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router; // Corrected export statement