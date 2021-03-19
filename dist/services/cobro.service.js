"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var query = "\nSELECT \n \tjson_build_object(\n  \t'idcliente_cobro', idcliente_cobro,\n\t\t 'idestadocobro', json_build_object(\n            'idestadocobro', estadocobro.idestadocobro, \n            'descripcion', estadocobro.descripcion\n          ), \n\t\t'descripcion', cliente_cobro.descripcion,\n\t \t'idcliente', json_build_object(\n\t\t\t'idcliente', cliente.idcliente,\n\t\t\t'razonsocial', cliente.razonsocial\n\t\t),\n\t\t'fechainsert', to_char(fechainsert, 'DD-MM-YYYY'),\n\t\t'fechacobro', to_char(fechacobro, 'DD-MM-YYYY'),\n\t\t'idusuarioinsert', idusuarioinsert,\n\t\t'idusuariocobro', idusuariocobro,\n\t\t'comentario', comentario,\n\t\t'saldocobrado',saldocobrado,\n    'saldoacobrar',saldoacobrar,\n    'retencion', retencion,\n\t\t'actividad_cobro',(\n\t\t\tSELECT json_agg(\n\t\t\t\tjson_build_object(\n\t\t\t\t\t'idactividad', act.idactividad\n\t\t\t\t)\n\t\t\t)\n\t\t\tFROM \tactividad_cobro AS act\n\t\t\tWHERE\tact.idcliente_cobro = cliente_cobro.idcliente_cobro\n\t\t)\n \t)\tas rows\nFROM public.cliente_cobro\nJOIN cliente USING (idcliente)\nJOIN estadocobro USING (idestadocobro)\n";
var CobroService = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
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

    function getById(_x) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
      var descripcion, precio, id, results;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              descripcion = _ref.descripcion, precio = _ref.precio, id = _ref.id;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("UPDATE concepto SET descripcion = $1, precio = $2 WHERE idconcepto = $3 RETURNING *", [descripcion, precio, id]);

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

    function update(_x2) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
      var results;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _db["default"].query("DELETE FROM concepto WHERE idconcepto  = $1", [id]);

            case 3:
              results = _context4.sent;
              return _context4.abrupt("return", results.rows);

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function _delete(_x3) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = CobroService;
exports["default"] = _default;