'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/todolist');

var TaskSchema = require('./schema-task');
var Task = db.model('task', TaskSchema);

module.exports = {
  Task: Task
};
