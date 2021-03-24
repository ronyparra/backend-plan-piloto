"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = exports.changeStatus = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var _formatter = require("./formatter");

var _date = require("../../util/date.util");

var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var master, tecnico, detalle, actividad_pendiente, results, idactividad, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            master = _ref.master, tecnico = _ref.tecnico, detalle = _ref.detalle, actividad_pendiente = _ref.actividad_pendiente;
            _context.prev = 1;
            _context.next = 4;
            return _db["default"].query("BEGIN");

          case 4:
            _context.next = 6;
            return _db["default"].query("INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha]);

          case 6:
            results = _context.sent;
            idactividad = results.rows[0].idactividad;
            actividad_tecnico = (0, _formatter.formatTecnico)(tecnico, idactividad);
            actividad_detalle = (0, _formatter.formatDetalle)(detalle, idactividad);
            _context.next = 12;
            return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ".concat(actividad_tecnico, " RETURNING *"));

          case 12:
            resultsTecnico = _context.sent;
            _context.next = 15;
            return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ".concat(actividad_detalle, " RETURNING *"));

          case 15:
            resultsConcepto = _context.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return _db["default"].query("INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES ($1, $2)", [idactividad, actividad_pendiente[0]]);

          case 19:
            _context.next = 21;
            return _db["default"].query("UPDATE pendiente SET activo = false WHERE idpendiente = $1", [actividad_pendiente[0]]);

          case 21:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context.next = 25;
            return _db["default"].query("COMMIT");

          case 25:
            return _context.abrupt("return", results.rows);

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](1);
            _context.next = 32;
            return _db["default"].query("ROLLBACK");

          case 32:
            throw _context.t0;

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 28]]);
  }));

  return function create(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var changeStatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var detalle, idestadocobro, idusuario, descripcion, total, idcliente, results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            detalle = _ref3.detalle, idestadocobro = _ref3.idestadocobro, idusuario = _ref3.idusuario, descripcion = _ref3.descripcion;
            total = (0, _formatter.calcularTotal)(detalle);
            idcliente = detalle[0].idcliente.idcliente;
            console.log(detalle);
            _context2.prev = 4;
            _context2.next = 7;
            return _db["default"].query("BEGIN");

          case 7:
            _context2.next = 9;
            return _db["default"].query((0, _formatter.formatActividadChangeStatus)(detalle, idestadocobro));

          case 9:
            _context2.next = 11;
            return _db["default"].query("INSERT INTO cliente_cobro(\n        idestadocobro, descripcion, idcliente, fechainsert, fechacobro, idusuarioinsert, idusuariocobro, comentario, saldocobrado, saldoacobrar, retencion, idmoneda)\n      VALUES (2, $1, $2, $3, null, $4, null, null, 0, $5, false, $6) RETURNING *", [descripcion, idcliente, (0, _date.current_date)(), idusuario, total, 1]);

          case 11:
            results = _context2.sent;
            _context2.next = 14;
            return _db["default"].query("INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES ".concat((0, _formatter.formatActividadCobro)(detalle, results.rows[0].idcliente_cobro)));

          case 14:
            _context2.next = 16;
            return _db["default"].query("COMMIT");

          case 16:
            _context2.next = 23;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](4);
            _context2.next = 22;
            return _db["default"].query("ROLLBACK");

          case 22:
            throw _context2.t0;

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 18]]);
  }));

  return function changeStatus(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var id, master, tecnico, detalle, actividad_pendiente, results, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref5.id, master = _ref5.master, tecnico = _ref5.tecnico, detalle = _ref5.detalle, actividad_pendiente = _ref5.actividad_pendiente;
            _context3.prev = 1;
            _context3.next = 4;
            return _db["default"].query("BEGIN");

          case 4:
            _context3.next = 6;
            return _db["default"].query("UPDATE actividad SET idcliente=$2, idcliente_sucursal=$3, idusuario=$4, idestadocobro=$5, solicitante=$6, comentario=$7, fecha=$8 WHERE idactividad = $1 RETURNING *", [id, master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha]);

          case 6:
            results = _context3.sent;
            _context3.next = 9;
            return _db["default"].query("DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1", [id]);

          case 9:
            _context3.next = 11;
            return _db["default"].query("DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1", [id]);

          case 11:
            _context3.next = 13;
            return _db["default"].query("DELETE FROM actividad_pendiente WHERE idactividad = $1", [id]);

          case 13:
            actividad_tecnico = (0, _formatter.formatTecnico)(tecnico, id);
            actividad_detalle = (0, _formatter.formatDetalle)(detalle, id);
            _context3.next = 17;
            return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ".concat(actividad_tecnico, " RETURNING *"));

          case 17:
            resultsTecnico = _context3.sent;
            _context3.next = 20;
            return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ".concat(actividad_detalle, " RETURNING *"));

          case 20:
            resultsConcepto = _context3.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context3.next = 24;
              break;
            }

            _context3.next = 24;
            return _db["default"].query("INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES ($1, $2)", [id, actividad_pendiente[0]]);

          case 24:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context3.next = 28;
            return _db["default"].query("COMMIT");

          case 28:
            return _context3.abrupt("return", results.rows);

          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3["catch"](1);
            _context3.next = 35;
            return _db["default"].query("ROLLBACK");

          case 35:
            throw _context3.t0;

          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 31]]);
  }));

  return function update(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var pendiente, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _db["default"].query("BEGIN");

          case 3:
            _context4.next = 5;
            return _db["default"].query("DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1", [id]);

          case 5:
            _context4.next = 7;
            return _db["default"].query("DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1", [id]);

          case 7:
            _context4.next = 9;
            return _db["default"].query("DELETE FROM actividad_pendiente WHERE idactividad = $1 RETURNING *", [id]);

          case 9:
            pendiente = _context4.sent;

            if (!(pendiente.rows.length > 0)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 13;
            return _db["default"].query("UPDATE pendiente SET activo = true WHERE idpendiente = $1", [pendiente.rows[0].idpendiente]);

          case 13:
            _context4.next = 15;
            return _db["default"].query("DELETE FROM actividad WHERE idactividad  = $1", [id]);

          case 15:
            results = _context4.sent;
            _context4.next = 18;
            return _db["default"].query("COMMIT");

          case 18:
            return _context4.abrupt("return", results.rows);

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            _context4.next = 25;
            return _db["default"].query("ROLLBACK");

          case 25:
            throw _context4.t0;

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21]]);
  }));

  return function delet(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.delet = delet;