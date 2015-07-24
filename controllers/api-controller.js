'use strict';
var copy = require('copy-to');
var Task = require('../modules/todo').Task;
var formatTime = require('../helper/format-time');
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
      var jsonData = addTask.toJSON();
      jsonData.time = formatTime(jsonData.date);
      copy({
        data: jsonData
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


module.exports.del = function* del() {
  var data = this.request.body;
  var ids = data.id || '';
  var idsArr = ids.split(',');

  var docs = yield Task.find({
    _id: {
      $in: idsArr
    }
  }).exec();

  docs.forEach(function(doc) {
    doc.remove();
  });

  this.body = JSON.stringify({
    status: 1,
    message: '删除成功!',
    data: idsArr
  });
};
// 修改任务状态
module.exports.put = function* put() {
  var data = this.request.body;
  try {
    yield Task.findOneAndUpdate({
      _id: data.id
    }, {
      completed: data.completed
    }).exec();
  } catch (e) {
    this.body = JSON.stringify({
      status: 0,
      message: '更新失败!',
      error: String(e)
    })
    return;
  };

  this.body = JSON.stringify({
    status: 1,
    message: '更新成功!'
  })
};
module.exports.completeAll = function* completeAll() {
  var data = this.request.body;
  try {
    var docs = yield Task
      .update({
        _id: {
          $in: data.ids
        }
      }, {
        completed: data.completed
      }, {
        multi: true
      }).exec()
  } catch (e) {
    this.body = JSON.stringify({
      status: 0,
      message: '更新失败!',
      error: String(e)
    })
    return;
  }
  this.body = JSON.stringify({
    status: 1,
    message: '更新成功!'
  })
};
