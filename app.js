'use strict';
var todo = require('./controllers/todo');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var xtplRender = require('xtpl/lib/koa');

var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', todo.home));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

xtplRender(app, {
  views: './views/'
})


// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000 \n');
  console.info('http://127.0.0.1:3000');
}
