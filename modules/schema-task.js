'use strict';

var mongoose = require('mongoose');

var SchemaTask = new mongoose.Schema({
  todo: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true }
});

SchemaTask.set('toJSON', { virtuals: true });

module.exports = SchemaTask;
