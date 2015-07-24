'use strict';
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var koaBody   = require('koa-body');
var koa = require('koa');
var path = require('path');
var xtplRender = require('xtpl/lib/koa');

var app = module.exports = koa();

// Logger
app.use(logger());
app.use(koaBody({
  strict: false
}));

app.use(require('./routers/home-router').routes());
app.use(require('./routers/api-router').routes());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, 'bower_components')));

xtplRender(app, {
  views: './views/'
});

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000 \n');
  console.info('http://127.0.0.1:3000');
}
