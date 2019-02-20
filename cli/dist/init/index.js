"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
Once Framework: The build once, use everywhere framework
./cli/init.js
*/
var argv = require('minimist')(process.argv.slice(2)),
    configstore = require('configstore'),
    chalk = require('chalk'),
    _require = require('figlet'),
    textSync = _require.textSync,
    fs = require('fs'),
    clear = require('clear'),
    _require2 = require('../../util/fsHelpers'),
    writeFile = _require2.writeFile,
    Config = require('./OnceConfig');

var InitHandler =
/*#__PURE__*/
function () {
  function InitHandler() {
    _classCallCheck(this, InitHandler);

    this.config = new Config();
    this.answers = {};
  }

  _createClass(InitHandler, [{
    key: "_welcome",
    value: function () {
      var _welcome2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clear();
                console.log(textSync('ONCE'));
                console.log(chalk.green('"The build once, use everywhere app framework"'));
                console.log(chalk.green('Brought to you by Mean Guppy 🐟'));

                if (this.config.exists) {
                  console.log(chalk.magenta('Once configuration found! Applying that to structure your monorepo.'));
                } else {
                  console.log(chalk.magenta('Once configuration not found. Starting from scratch!'));
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _welcome() {
        return _welcome2.apply(this, arguments);
      }

      return _welcome;
    }()
  }, {
    key: "_promptQuestions",
    value: function () {
      var _promptQuestions2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var welcomeText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                welcomeText = 'Welcome to Once CLI! We\'re going to step through a couple of things to get you all set up.';
                console.log(chalk.magenta(welcomeText));
                this.config.promptForConfig();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _promptQuestions() {
        return _promptQuestions2.apply(this, arguments);
      }

      return _promptQuestions;
    }()
  }, {
    key: "_run",
    value: function () {
      var _run2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._welcome();

              case 2:
                if (this.config.exists) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 5;
                return this._promptQuestions();

              case 5:
                _context3.next = 9;
                break;

              case 7:
                _context3.next = 9;
                return this.config.populateLocally();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _run() {
        return _run2.apply(this, arguments);
      }

      return _run;
    }()
  }]);

  return InitHandler;
}();

module.exports = new InitHandler()._run();