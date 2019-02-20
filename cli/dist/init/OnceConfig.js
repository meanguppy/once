"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../util/fsHelpers'),
    writeFile = _require.writeFile,
    fs = require('fs'),
    inquirer = require('inquirer'),
    _ = require('lodash');

var PLATFORM_CHOICES = [{
  title: 'Angular (NativeScript)',
  platform: 'mobile',
  code: 'ANGULAR_NATIVESCRIPT'
}, {
  title: 'Angular (Web)',
  platform: 'web',
  code: 'ANGULAR'
}, {
  title: 'React (Web)',
  platform: 'web',
  code: 'REACT'
}, {
  title: 'React Native',
  platform: 'native',
  code: 'REACT_NATIVE'
}];
var CONFIG_QUESTIONS = [{
  name: 'USER_NAME',
  type: 'input',
  message: 'First, what\'s your name? This will be used as the author of the packages.'
}, {
  name: 'PLATFORM_SUPPORT',
  type: 'checkbox',
  message: 'Next, we have a bunch of types of monorepos we could write. Select any of the following (you can always add more platforms later):',
  choices: PLATFORM_CHOICES.map(function (c) {
    return c.title;
  }),
  default: ['Angular (NativeScript)', 'Angular (Web)']
}];

module.exports =
/*#__PURE__*/
function () {
  function OnceConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OnceConfig);

    this._configRoute = './once.config.json';
    var platforms = config.platforms,
        author = config.author;
    this.platforms = platforms;
    this.author = author;
  }

  _createClass(OnceConfig, [{
    key: "populateLocally",
    value: function () {
      var _populateLocally = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _JSON$parse, platforms, author;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.exists) {
                  _context.next = 2;
                  break;
                }

                throw 'Local config file doesnt exist';

              case 2:
                _JSON$parse = JSON.parse(fs.readFileSync(this._configRoute)), platforms = _JSON$parse.platforms, author = _JSON$parse.author;
                if (platforms) this.platforms = platforms;
                if (author) this.author = author;

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function populateLocally() {
        return _populateLocally.apply(this, arguments);
      }

      return populateLocally;
    }()
  }, {
    key: "promptForConfig",
    value: function () {
      var _promptForConfig = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  var answers;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return inquirer.prompt(CONFIG_QUESTIONS);

                        case 2:
                          answers = _context2.sent;

                          _this._parsePromptedAnswersAndCreate(answers);

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                })), 1000);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function promptForConfig() {
        return _promptForConfig.apply(this, arguments);
      }

      return promptForConfig;
    }()
  }, {
    key: "_parsePromptedAnswersAndCreate",
    value: function () {
      var _parsePromptedAnswersAndCreate2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(answers) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (answers.PLATFORM_SUPPORT && Array.isArray(answers.PLATFORM_SUPPORT) && answers.PLATFORM_SUPPORT.length > 0) {
                  console.log('platform support', answers);
                  this.platforms = PLATFORM_CHOICES.filter(function (p) {
                    return p && p.title && answers.PLATFORM_SUPPORT.indexOf(p.title) > -1;
                  });
                }

                if (answers.USER_NAME) {
                  this.author = answers.USER_NAME || '<Enter Author Here>';
                }

                _context4.next = 4;
                return this.saveLocally();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _parsePromptedAnswersAndCreate(_x) {
        return _parsePromptedAnswersAndCreate2.apply(this, arguments);
      }

      return _parsePromptedAnswersAndCreate;
    }()
  }, {
    key: "saveLocally",
    value: function () {
      var _saveLocally = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var stringifiedConfig;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                stringifiedConfig = JSON.stringify(this.configObject, null, 4);
                _context5.next = 4;
                return writeFile(this._configRoute, stringifiedConfig);

              case 4:
                _context5.next = 9;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function saveLocally() {
        return _saveLocally.apply(this, arguments);
      }

      return saveLocally;
    }()
  }, {
    key: "exists",
    get: function get() {
      return fs.existsSync(this._configRoute);
    }
  }, {
    key: "configObject",
    get: function get() {
      return _.pick(this, ['author', 'platforms']);
    }
  }]);

  return OnceConfig;
}();