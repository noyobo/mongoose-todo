'use strict';

var Task = require('../modules/todo').Task;

module.exports.home = function* home() {

  var data = yield Task.find({}).sort({date: -1}).exec();

  this.body = yield this.render('todolist', {
    tasks: data
  });
};
