var express = require('express');
var router = express.Router();
const personController = require('../controllers/personController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  personController.getall(req, res);
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/update', function(req, res, next) {
  personController.update_get(req,res);
});

router.post('/update', function(req, res, next) {
  personController.update(req,res);
});

router.get('/delete', function(req, res, next) {
  personController.delete(req, res);
});

module.exports = router;
