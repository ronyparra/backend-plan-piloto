"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _formatter = require("./formatter");

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var fechacobro, idusuariocobro, comentario, saldocobrado, retencion, idestadocobro, actividad_cobro, id, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fechacobro = _ref.fechacobro, idusuariocobro = _ref.idusuariocobro, comentario = _ref.comentario, saldocobrado = _ref.saldocobrado, retencion = _ref.retencion, idestadocobro = _ref.idestadocobro, actividad_cobro = _ref.actividad_cobro, id = _ref.id;
            _context.prev = 1;
            _context.next = 4;
            return db.query("BEGIN");

          case 4:
            _context.next = 6;
            return db.query("UPDATE cliente_cobro\n        SET \n          fechacobro\t\t=$1, \n          idusuariocobro\t=$2, \n          comentario\t\t=$3, \n          saldocobrado\t    =$4, \n          retencion\t\t    =$5, \n          idestadocobro\t    =$6\n        WHERE idcliente_cobro = $7 RETURNING *", [fechacobro, idusuariocobro, comentario, saldocobrado, retencion, idestadocobro, id]);

          case 6:
            results = _context.sent;
            _context.next = 9;
            return db.query((0, _formatter.formatUpdateCobro)(actividad_cobro, idestadocobro));

          case 9:
            _context.next = 11;
            return db.query("COMMIT");

          case 11:
            return _context.abrupt("return", results.rows);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            _context.next = 18;
            return db.query("ROLLBACK");

          case 18:
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));

  return function update(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.query("DELETE FROM concepto WHERE idconcepto  = $1", [id]);

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

  return function delet(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.delet = delet;