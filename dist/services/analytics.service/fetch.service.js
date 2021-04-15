"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConcepto = exports.getCliente = exports.getPendientes = exports.getSaldoGeneral = exports.getSaldoPorEstado = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var _query = _interopRequireDefault(require("./query"));

var getSaldoPorEstado = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(desde, hasta, condicion, idestado) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(_query["default"].estado(condicion), [desde, hasta, idestado]).then(function (r) {
              return r.rows.map(function (x) {
                return x.rows;
              });
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function getSaldoPorEstado(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSaldoPorEstado = getSaldoPorEstado;

var getSaldoGeneral = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(desde, hasta) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _db["default"].query(_query["default"].general, [desde, hasta]).then(function (r) {
              return r.rows.map(function (x) {
                return x.rows;
              });
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function getSaldoGeneral(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getSaldoGeneral = getSaldoGeneral;

var getPendientes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(desde, hasta) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _db["default"].query(_query["default"].pendiente, [desde, hasta]).then(function (r) {
              return r.rows.map(function (x) {
                return x.rows;
              });
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function getPendientes(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPendientes = getPendientes;

var getCliente = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(desde, hasta) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _db["default"].query(_query["default"].cliente, [desde, hasta]).then(function (r) {
              return r.rows.map(function (x) {
                return x.rows;
              });
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function getCliente(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getCliente = getCliente;

var getConcepto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(desde, hasta) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _db["default"].query(_query["default"].concepto, [desde, hasta]).then(function (r) {
              return r.rows.map(function (x) {
                return x.rows;
              });
            });

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function getConcepto(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getConcepto = getConcepto;