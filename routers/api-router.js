'use strict';

var apiController = require('../controllers/api-controller');

var router = require('koa-router')();

router
  .post('/api/add', apiController.add)
  .put('/api/put', apiController.put)
  .del('/api/del', apiController.del)
  .put('/api/complete-all', apiController.completeAll)

module.exports = router;
