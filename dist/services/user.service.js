"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var UserService = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _db["default"].query("SELECT idusuario, username, nombre, apellido, precio FROM usuario");

            case 3:
              results = _context.sent;
              return _context.abrupt("return", results.rows);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function getAll() {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  getById: function () {
    var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var results;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _db["default"].query("SELECT idusuario, username, nombre, apellido, precio FROM usuario WHERE idusuario  = $1", [id]);

            case 3:
              results = _context2.sent;
              return _context2.abrupt("return", results.rows);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function getById(_x) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  getByUsername: function () {
    var _getByUsername = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
      var username, results;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = _ref.username;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("SELECT idusuario, username, password, nombre, apellido, precio FROM usuario WHERE username  LIKE $1", [username]);

            case 4:
              results = _context3.sent;
              return _context3.abrupt("return", results.rows[0]);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              throw _context3.t0;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 8]]);
    }));

    function getByUsername(_x2) {
      return _getByUsername.apply(this, arguments);
    }

    return getByUsername;
  }(),
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var username, password, nombre, apellido, results;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              username = _ref2.username, password = _ref2.password, nombre = _ref2.nombre, apellido = _ref2.apellido;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query("INSERT INTO usuario (username,password,nombre,apellido) VALUES ($1, $2,$3,$4) RETURNING *", [username, password, nombre, apellido]);

            case 4:
              results = _context4.sent;
              return _context4.abrupt("return", results.rows);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              throw _context4.t0;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 8]]);
    }));

    function create(_x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref3) {
      var username, password, nombre, apellido, id, results;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              username = _ref3.username, password = _ref3.password, nombre = _ref3.nombre, apellido = _ref3.apellido, id = _ref3.id;
              _context5.prev = 1;
              _context5.next = 4;
              return _db["default"].query("UPDATE usuario SET username = $1, password = $2,nombre = $3,apellido = $4 WHERE idusuario = $5 RETURNING *", [username, password, nombre, apellido, id]);

            case 4:
              results = _context5.sent;
              return _context5.abrupt("return", results.rows);

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](1);
              throw _context5.t0;

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 8]]);
    }));

    function update(_x4) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
      var results;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _db["default"].query("DELETE FROM usuario WHERE idusuario  = $1", [id]);

            case 3:
              results = _context6.sent;
              return _context6.abrupt("return", results.rows);

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));

    function _delete(_x5) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = UserService;
exports["default"] = _default;