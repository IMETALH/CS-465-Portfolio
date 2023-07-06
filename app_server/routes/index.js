var express = require('express');
var router = express.Router();
const constroller = require('../controllers/main');

/* GET home page. */
router.get('/', constroller.index);

module.exports = router;
