'use strict';
var formatTime = require('../helper/format-time');

var Task = require('../modules/todo').Task;

module.exports.index = function* home() {
  var data = yield Task.find({}).sort({
    date: -1
  }).exec();
  var completed = 0;
  for (var i = 0; i < data.length; i++) {
    var task = data[i];
    task.time = formatTime(task.date);
    if (task.completed) {
      completed += 1;
    }
  }
  this.body = yield this.render('todolist', {
    tasks: data,
    completedCount: completed
  });
};
