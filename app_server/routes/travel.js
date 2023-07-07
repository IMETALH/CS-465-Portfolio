const express = require('express');
const router = express.Router();
const constroller = require('../controllers/travel');

/* GET home page. */
router.get('/', constroller.travel);

module.exports = router;
