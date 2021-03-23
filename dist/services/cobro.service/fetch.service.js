"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var query = "\nSELECT \n \tjson_build_object(\n  \t'idcliente_cobro', idcliente_cobro,\n\t\t 'idestadocobro', json_build_object(\n            'idestadocobro', estadocobro.idestadocobro, \n            'descripcion', estadocobro.descripcion\n          ), \n\t\t'descripcion', cliente_cobro.descripcion,\n\t \t'idcliente', json_build_object(\n\t\t\t'idcliente', cliente.idcliente,\n\t\t\t'razonsocial', cliente.razonsocial\n\t\t),\n\t\t'fechainsert', to_char(fechainsert, 'DD-MM-YYYY'),\n\t\t'fechacobro', to_char(fechacobro, 'DD-MM-YYYY'),\n\t\t'idusuarioinsert', idusuarioinsert,\n\t\t'idusuariocobro', idusuariocobro,\n\t\t'comentario', comentario,\n\t\t'saldocobrado',saldocobrado,\n    'saldoacobrar',saldoacobrar,\n    'retencion', retencion,\n\t\t'actividad_cobro',(\n\t\t\tSELECT json_agg(\n\t\t\t\tjson_build_object(\n\t\t\t\t\t'idactividad', act.idactividad\n\t\t\t\t)\n\t\t\t)\n\t\t\tFROM \tactividad_cobro AS act\n\t\t\tWHERE\tact.idcliente_cobro = cliente_cobro.idcliente_cobro\n\t\t)\n \t)\tas rows\nFROM public.cliente_cobro\nJOIN cliente USING (idcliente)\nJOIN estadocobro USING (idestadocobro) \n";

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filters) {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query + generateFilter(filters) + ' ORDER BY idcliente_cobro ASC');

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

  return function getAll(_x) {
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
            return _db["default"].query(query + " WHERE idcliente_cobro = $1", [id]);

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

  return function getById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getById = getById;

var generateFilter = function generateFilter(_ref3) {
  var idcliente = _ref3.idcliente,
      desde = _ref3.desde,
      hasta = _ref3.hasta,
      idestadocobro = _ref3.idestadocobro;
  var filterCliente = idcliente ? "cliente.idcliente = ".concat(idcliente) : null;
  var filterFecha = "fechainsert BETWEEN '".concat(desde, "'::date AND '").concat(hasta, "'::date");
  var filterEstado = idestadocobro ? "idestadocobro = ".concat(idestadocobro) : null;
  var filter = "WHERE ".concat(filterFecha, " ").concat(filterCliente ? "AND ".concat(filterCliente) : "", " ").concat(filterEstado ? "AND ".concat(filterEstado) : "");
  return filter;
};