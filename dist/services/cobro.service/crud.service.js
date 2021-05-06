"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = require("../../db");

var _formatter = require("./formatter");

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var fechacobro, idusuariocobro, comentario, saldocobrado, retencion, idestadocobro, actividad_cobro, id, client, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fechacobro = _ref.fechacobro, idusuariocobro = _ref.idusuariocobro, comentario = _ref.comentario, saldocobrado = _ref.saldocobrado, retencion = _ref.retencion, idestadocobro = _ref.idestadocobro, actividad_cobro = _ref.actividad_cobro, id = _ref.id;
            _context.next = 3;
            return _db.pool.connect();

          case 3:
            client = _context.sent;
            _context.prev = 4;
            _context.next = 7;
            return client.query("BEGIN");

          case 7:
            _context.next = 9;
            return client.query("UPDATE cliente_cobro\n        SET \n          fechacobro\t\t  =$1, \n          idusuariocobro\t=$2, \n          comentario\t\t  =$3, \n          saldocobrado\t  =$4, \n          retencion\t\t    =$5, \n          idestadocobro\t  =$6\n        WHERE idcliente_cobro = $7 RETURNING *", [fechacobro, idusuariocobro, comentario, saldocobrado, retencion, idestadocobro, id]);

          case 9:
            results = _context.sent;
            _context.next = 12;
            return client.query((0, _formatter.formatUpdateCobro)(actividad_cobro, idestadocobro));

          case 12:
            _context.next = 14;
            return client.query("COMMIT");

          case 14:
            return _context.abrupt("return", results.rows);

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](4);
            _context.next = 21;
            return client.query("ROLLBACK");

          case 21:
            throw _context.t0;

          case 22:
            _context.prev = 22;
            client.release();
            return _context.finish(22);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 17, 22, 25]]);
  }));

  return function update(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var client, actividad_cobro, results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _db.pool.connect();

          case 2:
            client = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return client.query("BEGIN");

          case 6:
            _context2.next = 8;
            return client.query("SELECT idcliente_cobro, idactividad FROM actividad_cobro WHERE idcliente_cobro = $1", [id]);

          case 8:
            actividad_cobro = _context2.sent;
            _context2.next = 11;
            return client.query((0, _formatter.formatUpdateCobro)(actividad_cobro.rows, 1));

          case 11:
            _context2.next = 13;
            return client.query("DELETE FROM actividad_cobro WHERE idcliente_cobro = $1", [id]);

          case 13:
            _context2.next = 15;
            return client.query("DELETE FROM cliente_cobro WHERE idcliente_cobro  = $1", [id]);

          case 15:
            results = _context2.sent;
            _context2.next = 18;
            return client.query("COMMIT");

          case 18:
            return _context2.abrupt("return", results.rows);

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](3);
            _context2.next = 25;
            return client.query("ROLLBACK");

          case 25:
            throw _context2.t0;

          case 26:
            _context2.prev = 26;
            client.release();
            return _context2.finish(26);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 21, 26, 29]]);
  }));

  return function delet(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.delet = delet;