'use strict';
var copy = require('copy-to');
var moment = require('moment');

var Task = require('../modules/todo').Task;

module.exports.home = function* home() {
  var data = yield Task.find({}).sort({
    date: -1
  }).exec();
  var completed = 0;
  for (var i = 0; i < data.length; i++) {
    var task = data[i];
    task.time = moment(new Date(task.date)).format('YYYY-MM-DD HH:mm:ss');
    if (task.completed) {
      completed += 1;
    }
  };
  this.body = yield this.render('todolist', {
    tasks: data,
    completedCount: completed
  });
};

/**
 * 增加任务
 */
module.exports.add = function* add() {
  var data = this.request.body;
  var response = {
    status: 1,
    message: '添加成功!'
  };
  var saveData = {};
  if (!data.todo) {
    response = {
      status: 0,
      message: '任务不能未为空!'
    };
  } else {
    var addTask = new Task({
      todo: data.todo,
      date: Date.now()
    });
    try {
      saveData = yield addTask.saveAsync();
      copy({
        data: addTask.toJSON()
      }).to(response);
    } catch (e) {
      response = {
        status: 0,
        message: '添加失败',
        error: String(e)
      };
    }
  }

  this.body = JSON.stringify(response);
};
