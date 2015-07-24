'use strict';

module.exports.home = function* home() {
  this.body = yield this.render('layout', {
    title: 'hello mongoose'
  });
};
