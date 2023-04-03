var express = require('express');
var router = express.Router();
const personController = require('../controllers/personController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  personController.getall(req, res);
});

router.post('/', function(req, res, next) {
  personController.create(req, res);
});

module.exports = router;
