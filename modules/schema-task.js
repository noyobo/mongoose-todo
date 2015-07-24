'use strict';

var Promise = require('bluebird');
function saveAsync() {
  var self = this;
  return new Promise(function(resolve, reject){
    self.save(function(err, result){
      if(err) return reject(err);
      resolve(result);
    });
  })
};

var mongoose = require('mongoose');

var SchemaTask = new mongoose.Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
  date: { type: Date, required: true }
});

/**
 * Promise save
 */
SchemaTask.methods.saveAsync = saveAsync;
SchemaTask.set('toJSON', { virtuals: true });

module.exports = SchemaTask;
