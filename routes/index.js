var express = require('express');
var router = express.Router();
const personController = require('../controllers/personController.js')
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureAuthenticated, function(req, res, next) {
  personController.getall(req, res);
});

router.get('/create', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('create');
});

router.get('/update', authMiddleware.ensureAuthenticated, function(req, res, next) {
  personController.update_get(req, res);
});

router.post('/update', authMiddleware.ensureAuthenticated, function(req, res, next) {
  personController.update(req, res);
});

router.get('/delete', authMiddleware.ensureAuthenticated, function(req, res, next) {
  personController.delete(req, res);
});

module.exports = router;
