"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = exports.changeStatus = exports.create = exports.getById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var _formatter = require("../actividad.service/formatter");

var query = "\n  SELECT \n\t  json_build_object(\n\t  'idpendiente',idpendiente, \n\t  'idtipo_pendiente',json_build_object(\n\t\t  'idtipo_pendiente', tp.idtipo_pendiente,\n\t\t  'descripcion',tp.descripcion,\n\t\t  'color', tp.color\n\t  ), \n\t  'fecha', to_char(fecha, 'DD-MM-YYYY'),\n    'descripcion', pendiente.descripcion,\n    'activo',pendiente.activo,\n    'pendiente_tecnico',COALESCE((\n      SELECT json_agg(\n        json_build_object(\n          'idusuario',pen.idusuario,\n          'nombre',usu.nombre\n        )\n      )\n      FROM    pendiente_tecnico AS pen\n      JOIN    usuario AS usu ON pen.idusuario = usu.idusuario\n      WHERE   idpendiente = pendiente.idpendiente\n    ),'[]')\n\t  ) as rows\n  FROM pendiente\n  JOIN tipo_pendiente as tp USING (idtipo_pendiente)";

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query + " WHERE activo = true ORDER BY activo DESC");

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
    var idtipo_pendiente, fecha, descripcion, pendiente_tecnico, results, idpendiente, tecnicos, resultsTecnico;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            idtipo_pendiente = _ref3.idtipo_pendiente, fecha = _ref3.fecha, descripcion = _ref3.descripcion, pendiente_tecnico = _ref3.pendiente_tecnico;
            _context3.prev = 1;
            _context3.next = 4;
            return _db["default"].query("BEGIN");

          case 4:
            _context3.next = 6;
            return _db["default"].query("INSERT INTO pendiente(idtipo_pendiente, fecha, descripcion) VALUES ($1, $2, $3) RETURNING *", [idtipo_pendiente, fecha, descripcion]);

          case 6:
            results = _context3.sent;

            if (!(pendiente_tecnico.length > 0)) {
              _context3.next = 14;
              break;
            }

            idpendiente = results.rows[0].idpendiente;
            tecnicos = (0, _formatter.formatTecnico)(pendiente_tecnico, idpendiente);
            _context3.next = 12;
            return _db["default"].query("INSERT INTO pendiente_tecnico(idpendiente, idusuario)VALUES ".concat(tecnicos, " RETURNING *"));

          case 12:
            resultsTecnico = _context3.sent;
            results.rows[0].pendiente_tecnico = resultsTecnico.rows;

          case 14:
            _context3.next = 16;
            return _db["default"].query("COMMIT");

          case 16:
            return _context3.abrupt("return", results.rows);

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](1);
            _context3.next = 23;
            return _db["default"].query("ROLLBACK");

          case 23:
            throw _context3.t0;

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 19]]);
  }));

  return function create(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.create = create;

var changeStatus = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
    var activo, idpendiente, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activo = _ref5.activo, idpendiente = _ref5.idpendiente;
            _context4.prev = 1;
            _context4.next = 4;
            return _db["default"].query("UPDATE pendiente SET activo = $1 WHERE idpendiente = $2 RETURNING * ", [activo, idpendiente]);

          case 4:
            result = _context4.sent;
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            throw _context4.t0;

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function changeStatus(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var update = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref7) {
    var idtipo_pendiente, fecha, descripcion, pendiente_tecnico, id, results, tecnicos, resultsTecnico;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            idtipo_pendiente = _ref7.idtipo_pendiente, fecha = _ref7.fecha, descripcion = _ref7.descripcion, pendiente_tecnico = _ref7.pendiente_tecnico, id = _ref7.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _db["default"].query("BEGIN");

          case 4:
            _context5.next = 6;
            return _db["default"].query("UPDATE pendiente SET idtipo_pendiente = $1, fecha = $2, descripcion = $3 WHERE idpendiente = $4 RETURNING *", [idtipo_pendiente, fecha, descripcion, id]);

          case 6:
            results = _context5.sent;
            _context5.next = 9;
            return _db["default"].query("DELETE FROM pendiente_tecnico WHERE idpendiente = $1", [id]);

          case 9:
            if (!(pendiente_tecnico.length > 0)) {
              _context5.next = 15;
              break;
            }

            tecnicos = (0, _formatter.formatTecnico)(pendiente_tecnico, id);
            _context5.next = 13;
            return _db["default"].query("INSERT INTO pendiente_tecnico(idpendiente, idusuario)VALUES ".concat(tecnicos, " RETURNING *"));

          case 13:
            resultsTecnico = _context5.sent;
            results.rows[0].pendiente_tecnico = resultsTecnico.rows;

          case 15:
            _context5.next = 17;
            return _db["default"].query("COMMIT");

          case 17:
            return _context5.abrupt("return", results.rows);

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](1);
            _context5.next = 24;
            return _db["default"].query("ROLLBACK");

          case 24:
            throw _context5.t0;

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 20]]);
  }));

  return function update(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var results;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _db["default"].query("DELETE FROM pendiente_tecnico WHERE idpendiente = $1", [id]);

          case 3:
            _context6.next = 5;
            return _db["default"].query("DELETE FROM pendiente WHERE idpendiente  = $1", [id]);

          case 5:
            results = _context6.sent;
            return _context6.abrupt("return", results.rows);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function delet(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

exports.delet = delet;