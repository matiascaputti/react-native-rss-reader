'use strict';

exports.__esModule = true;

exports['default'] = function (items) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!Array.isArray(items)) {
    throw new Error('mirrorCreator(...): argument must be an array.');
  }

  var prefix = options.prefix;

  var container = {};
  items.forEach(function (item) {
    return container[item] = '' + (prefix || '') + item;
  });
  return container;
};

module.exports = exports['default'];