const express = require('express');
const router = express.Router();
const constroller = require('../controllers/main');

/* GET home page. */
router.get('/', constroller.index);

module.exports = router;
