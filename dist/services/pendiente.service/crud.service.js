"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = exports.create = exports.getById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var query = "\n  SELECT \n\t  json_build_object(\n\t  'idpendiente',idpendiente, \n\t  'idtipo_pendiente',json_build_object(\n\t\t  'idtipo_pendiente', tp.idtipo_pendiente,\n\t\t  'descripcion',tp.descripcion,\n\t\t  'color', tp.color\n\t  ), \n\t  'fecha', to_char(fecha, 'DD-MM-YYYY'),\n\t  'descripcion', pendiente.descripcion\n\t  ) as rows\n  FROM pendiente\n  JOIN tipo_pendiente as tp USING (idtipo_pendiente)";

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query);

          case 3:
            results = _context.sent;
            return _context.abrupt("return", results.rows.map(function (x) {
              return x.rows;
            }));

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

  return function getAll() {
    return _ref.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var getById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _db["default"].query(query + " WHERE idpendiente  = $1", [id]);

          case 3:
            results = _context2.sent;
            return _context2.abrupt("return", results.rows[0].rows);

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

  return function getById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getById = getById;

var create = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var idtipo_pendiente, fecha, descripcion, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            idtipo_pendiente = _ref3.idtipo_pendiente, fecha = _ref3.fecha, descripcion = _ref3.descripcion;
            _context3.prev = 1;
            _context3.next = 4;
            return _db["default"].query("INSERT INTO pendiente(idtipo_pendiente, fecha, descripcion) VALUES ($1, $2, $3) RETURNING *", [idtipo_pendiente, fecha, descripcion]);

          case 4:
            results = _context3.sent;
            return _context3.abrupt("return", results.rows);

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

  return function create(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.create = create;

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
    var idtipo_pendiente, fecha, descripcion, id, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            idtipo_pendiente = _ref5.idtipo_pendiente, fecha = _ref5.fecha, descripcion = _ref5.descripcion, id = _ref5.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _db["default"].query("UPDATE pendiente SET idtipo_pendiente = $1, fecha = $2, descripcion = $3 WHERE idpendiente = $4 RETURNING *", [idtipo_pendiente, fecha, descripcion, id]);

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

  return function update(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _db["default"].query("DELETE FROM pendiente WHERE idpendiente  = $1", [id]);

          case 3:
            results = _context5.sent;
            return _context5.abrupt("return", results.rows);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function delet(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.delet = delet;