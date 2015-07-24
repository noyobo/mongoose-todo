'use strict';

var homeController = require('../controllers/home-controller');

var router = require('koa-router')();

router.get('/', homeController.index);

module.exports = router;
