const express = require('express');
const router = express.Router();
const controller= require('../controllers/travel');

/* GET home view. */
router.get('/', controller.tripList);

module.exports = router;