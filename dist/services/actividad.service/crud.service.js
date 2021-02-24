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

var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var master, tecnico, detalle, results, idactividad, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            master = _ref.master, tecnico = _ref.tecnico, detalle = _ref.detalle;
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
            return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ".concat(actividad_tecnico, " RETURNING *"));

          case 12:
            resultsTecnico = _context.sent;
            _context.next = 15;
            return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ".concat(actividad_detalle, " RETURNING *"));

          case 15:
            resultsConcepto = _context.sent;
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context.next = 20;
            return _db["default"].query("COMMIT");

          case 20:
            return _context.abrupt("return", results.rows);

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](1);
            _context.next = 27;
            return _db["default"].query("ROLLBACK");

          case 27:
            throw _context.t0;

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 23]]);
  }));

  return function create(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var changeStatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var detalle, idestadocobro, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            detalle = _ref3.detalle, idestadocobro = _ref3.idestadocobro;
            query = detalle.reduce(function (acc, curr) {
              return acc = acc + "UPDATE actividad SET  idestadocobro= ".concat(idestadocobro, "  WHERE idactividad =  ").concat(curr.idactividad, ";\n");
            }, "");
            _context2.prev = 2;
            _context2.next = 5;
            return _db["default"].query("BEGIN");

          case 5:
            _context2.next = 7;
            return _db["default"].query(query);

          case 7:
            _context2.next = 9;
            return _db["default"].query("COMMIT");

          case 9:
            _context2.next = 16;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            _context2.next = 15;
            return _db["default"].query("ROLLBACK");

          case 15:
            throw _context2.t0;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function changeStatus(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var id, master, tecnico, detalle, results, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref5.id, master = _ref5.master, tecnico = _ref5.tecnico, detalle = _ref5.detalle;
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
            actividad_tecnico = (0, _formatter.formatTecnico)(tecnico, id);
            actividad_detalle = (0, _formatter.formatDetalle)(detalle, id);
            _context3.next = 15;
            return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ".concat(actividad_tecnico, " RETURNING *"));

          case 15:
            resultsTecnico = _context3.sent;
            _context3.next = 18;
            return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ".concat(actividad_detalle, " RETURNING *"));

          case 18:
            resultsConcepto = _context3.sent;
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context3.next = 23;
            return _db["default"].query("COMMIT");

          case 23:
            return _context3.abrupt("return", results.rows);

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](1);
            _context3.next = 30;
            return _db["default"].query("ROLLBACK");

          case 30:
            throw _context3.t0;

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 26]]);
  }));

  return function update(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var results;
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
            return _db["default"].query("DELETE FROM actividad WHERE idactividad  = $1", [id]);

          case 9:
            results = _context4.sent;
            _context4.next = 12;
            return _db["default"].query("COMMIT");

          case 12:
            return _context4.abrupt("return", results.rows);

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            _context4.next = 19;
            return _db["default"].query("ROLLBACK");

          case 19:
            throw _context4.t0;

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function delet(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.delet = delet;